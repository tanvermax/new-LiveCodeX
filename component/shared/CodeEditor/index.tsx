"use client";
import Editor from "@monaco-editor/react";

type Props = {
  language: string;
  value: string;
  height?: string;
  width?: string;
  onChange?: (value: string | undefined) => void;
};

const DEFAULT_LANGUAGE = "javascript";

export const CodeEditor = ({
  language,
  value,
  width = "50vw",
  height = "50vh",
  onChange,
}: Props) => {
  return (
    <Editor
      className="border-4 text-xl border-blue-400"
      theme="vs-dark"
      height={height}
      width={width}
      onChange={onChange}
      defaultLanguage={DEFAULT_LANGUAGE}
      language={language ?? DEFAULT_LANGUAGE}
      value={value || ""}
    />
  );
};
