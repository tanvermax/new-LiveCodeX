// "use client";
// import Editor from "@monaco-editor/react";

// type Props = {
//   language: string;
//   value: string;
//   height?: string;
//   width?: string;
//   onChange?: (value: string | undefined) => void;
// };

// const DEFAULT_LANGUAGE = "javascript";

// export const CodeEditor = ({
//   language,
//   value,
//   width = "50vw",
//   height = "50vh",
//   onChange,
// }: Props) => {
//   return (
//     <Editor
//       className="border-4 text-xl border-blue-400"
//       theme="vs-dark"
//       height={height}
//       width={width}
//       onChange={onChange}
//       defaultLanguage={DEFAULT_LANGUAGE}
//       language={language ?? DEFAULT_LANGUAGE}
//       value={value || ""}
//     />
//   );
// };


"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

type Props = {
  language: string;
  value: string;
  height?: string;
  width?: string;
  onChange?: (value: string | undefined) => void;
};

const DEFAULT_LANGUAGE = "javascript";

const CodeEditor = ({
  language,
  value,
  width = "50vw",
  height = "50vh",
  onChange,
}: Props) => {
  const [theme, setTheme] = useState("vs-dark"); // Set initial theme to "vs-dark"

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value); // Change the theme based on user selection
  };

  return (
    <div>
      {/* Dropdown for selecting theme */}
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
        theme={theme} // Dynamically set the theme
        height={height}
        width={width}
        onChange={onChange}
        defaultLanguage={DEFAULT_LANGUAGE}
        language={language ?? DEFAULT_LANGUAGE}
        value={value || ""}
      />
    </div>
  );
};

export default CodeEditor;
