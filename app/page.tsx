"use client";

import { useState } from "react";
import { CodeEditor } from "@/component/shared/CodeEditor";
import LanguageSelector from "@/component/shared/LanguageSelector";
import Banner from "../component/Banner";

export default function Home() {
  const [code, setCode] = useState<string>("console.log('Hello, World!');");
  const [output, setOutput] = useState<string>("");

  // Function to run the code and set output
  const runCode = () => {
    try {
      const capturedLogs: string[] = [];
      const originalConsoleLog = console.log;

      console.log = (...args: any[]) => {
        capturedLogs.push(args.join(" "));
        originalConsoleLog(...args);
      };

      new Function(code)();
      setOutput(capturedLogs.join("\n"));

      console.log = originalConsoleLog; // Restore console.log
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center p-4">Code Editor</h1>

      <div className="text-left">
        <LanguageSelector runCode={runCode} />
        <CodeEditor language="javascript" value={code} onChange={(value) => setCode(value ?? '')} />
        
        {/* Run Code Button */}
        <button
          onClick={runCode}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Run Code
        </button>

        {/* Output Section */}
        <div className="bg-gray-900 text-white p-3 rounded-md min-h-[100px] mt-3">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      </div>

      <Banner />
    </div>
  );
}
