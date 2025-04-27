
"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Button } from "@/components/ui/button";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ScrollArea } from "@/components/ui/ScrollArea";
// import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

// import "./debugger.css"; // includes .my-breakpoint style

const MonacoDebugger = ({
  code,
  language,
  onCodeChange,
}: {
  code: string;
  language: string;
  onCodeChange: (val: string) => void;
}) => {
  const editorRef = useRef<any>(null);
  const [debugBlocks, setDebugBlocks] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(-1);
  const [output, setOutput] = useState<string>("");
  const [variables, setVariables] = useState<{ [key: string]: any }>({});
  const [decorations, setDecorations] = useState<string[]>([]);
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set());

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const line = e.target.position?.lineNumber;
        if (line) {
          setBreakpoints((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(line)) newSet.delete(line);
            else newSet.add(line);
            return newSet;
          });
        }
      }
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      const newDecorations = Array.from(breakpoints).map((line) => ({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: false,
          glyphMarginClassName: "my-breakpoint",
        },
      }));
      setDecorations(
        editorRef.current.deltaDecorations(decorations, newDecorations)
      );
    }
  }, [breakpoints, decorations]);

  const getStatements = (code: string): string[] => {
    const lines = code.split("\n");
    const statements: string[] = [];
    let current = "";
    let openBraces = 0;

    for (const line of lines) {
      current += line + "\n";
      openBraces += (line.match(/{/g) || []).length;
      openBraces -= (line.match(/}/g) || []).length;

      if (openBraces === 0 && current.trim()) {
        statements.push(current.trim());
        current = "";
      }
    }

    if (current.trim()) {
      statements.push(current.trim());
    }

    return statements;
  };

  const sanitizeCode = (code: string): string => {
    return code.replace(/\b(let|const|var)\s+/g, "");
  };

  const evaluateBlock = (block: string) => {
    const logs: string[] = [];
    const proxyConsole = {
      log: (...args: any[]) => logs.push(args.join(" ")),
    };

    try {
      const varsCopy = { ...variables };
      const sanitized = sanitizeCode(block);

      const scopedEval = new Function("vars", "customConsole", `
        with (vars) {
          const console = customConsole;
          ${sanitized}
        }
      `);

      scopedEval(varsCopy, proxyConsole);

      setVariables(varsCopy);
      if (logs.length) {
        setOutput((prev) => prev + logs.map((log) => `>> ${log}\n`).join(""));
      }
    } catch (err: any) {
      setOutput((prev) => prev + `❌ Error: ${err.message}\n`);
    }
  };

  const debugLineByLine = () => {
    const blocks = getStatements(code);
    setDebugBlocks(blocks);
    setCurrentLine(0);
    setOutput("");
    setVariables({});

    if (editorRef.current) {
      setDecorations(editorRef.current.deltaDecorations(decorations, []));
    }
  };

  const nextLine = () => {
    if (currentLine >= debugBlocks.length) return;

    const block = debugBlocks[currentLine];
    evaluateBlock(block);
    setCurrentLine((prev) => prev + 1);

    const codeLines = code.split("\n");
    const blockLines = block.split("\n").map((line) => line.trim());
    const startLine = codeLines.findIndex((_, i) =>
      codeLines
        .slice(i, i + blockLines.length)
        .map((line) => line.trim())
        .join("\n") === blockLines.join("\n")
    );

    if (editorRef.current && startLine !== -1) {
      const lineNumber = startLine + 1;
      const newDecorations = editorRef.current.deltaDecorations(decorations, [
        {
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className: "bg-yellow-200",
          },
        },
      ]);
      setDecorations(newDecorations);
      editorRef.current.revealLineInCenter(lineNumber);
    }
  };

  return (
    <PanelGroup direction="horizontal" className="h-[500px] border rounded mt-6">
      <Panel defaultSize={60} minSize={30}>
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onMount={handleEditorDidMount}
          onChange={(val) => onCodeChange(val || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            glyphMargin: true,
          }}
        />
      </Panel>

      <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize" />

      <Panel defaultSize={40} minSize={20} className="bg-gray-100">
        <div className="p-4 flex flex-col h-full gap-4">
          <div className="flex justify-between">
            <Button onClick={debugLineByLine}>Start Debugging</Button>
            <Button
              onClick={nextLine}
              disabled={currentLine === -1 || currentLine >= debugBlocks.length}
            >
              Next Line
            </Button>
          </div>

          <ScrollArea className="border rounded p-2 bg-white text-sm whitespace-pre-wrap flex-1">
            <h2 className="font-semibold mb-1">📄 Console Output</h2>
            {output}
          </ScrollArea>

          <ScrollArea className="border rounded p-2 bg-white text-sm flex-1">
            <h2 className="font-semibold mb-1">🔎 Variables</h2>
            {Object.entries(variables).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {JSON.stringify(value)}
              </div>
            ))}
          </ScrollArea>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default dynamic(() => Promise.resolve(MonacoDebugger), { ssr: false });  
