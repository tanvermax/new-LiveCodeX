
"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

type Props = {
  language: string;
  value?: string;
  height?: string;
  width?: string;
  onChange?: (value: string | undefined) => void;
};

const DEFAULT_LANGUAGE = "javascript";
const LOCAL_STORAGE_KEY = "code-editor-content"; // Key for local storage

const CodeEditor = ({
  language,
  value,
  width = "50vw",
  height = "50vh",
  onChange,
}: Props) => {
  const [theme, setTheme] = useState("vs-dark"); // Initial theme
  const [code, setCode] = useState<string>(() => {
    // Load saved code from local storage on initial render
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
  });

  // Function to handle theme change
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  // Function to handle code change
  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
    localStorage.setItem(LOCAL_STORAGE_KEY, value || ""); // Auto-save to local storage
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {/* Theme Selector */}
      <div className="mb-4">
        <label htmlFor="theme-selector" className="mr-2 font-bold">
          Select Theme:
        </label>
        <select
          id="theme-selector"
          value={theme}
          onChange={handleThemeChange}
          className="border px-2 py-1 rounded-md"
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <Editor
        className="border-4 text-xl border-blue-400"
        theme={theme}
        height={height}
        width={width}
        onChange={handleCodeChange}
        defaultLanguage={DEFAULT_LANGUAGE}
        language={language ?? DEFAULT_LANGUAGE}
        value={code ||value || ""} // Added value prop
      />
    </div>
  );
};

export default CodeEditor;







