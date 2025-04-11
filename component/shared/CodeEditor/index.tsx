
// "use client";
// import { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";

// type Props = {
//   language: string;
//   value?: string;
//   height?: string;
//   width?: string;
//   onChange?: (value: string | undefined) => void;
// };

// const DEFAULT_LANGUAGE = "javascript";
// const LOCAL_STORAGE_KEY = "code-editor-content"; // Key for local storage

// const CodeEditor = ({
//   language,
//   value,
//   // width = "50vw",
//   height = "50vh",
//   onChange,
// }: Props) => {
//   const [theme, setTheme] = useState("vs-dark"); // Initial theme
//   const [code, setCode] = useState<string>(() => {
//     // Load saved code from local storage on initial render
//     return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
//   });

//   // Function to handle theme change
//   const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setTheme(event.target.value);
//   };

 
//   const handleCodeChange = (value: string | undefined) => {
//     try {
//       setCode(value || "");
//       localStorage.setItem(LOCAL_STORAGE_KEY, value || ""); // Auto-save to local storage
//       if (onChange) {
//         onChange(value);
//       }
//     } catch (error) {
//       console.error("Error saving to localStorage:", error);
//     }
//   };
  

//   return (
//     <div>
//       {/* Theme Selector */}
//       <div className="mb-4">
//         <label htmlFor="theme-selector" className="mr-2 font-bold">
//           Select Theme:
//         </label>
//         <select
//           id="theme-selector"
//           value={theme}
//           onChange={handleThemeChange}
//           className="border px-2 py-1 rounded-md"
//         >
//           <option value="vs-dark">Dark</option>
//           <option value="vs-light">Light</option>
//           <option value="hc-black"> Contrast</option>
//         </select>
//       </div>

//       {/* Monaco Editor */}
//       <Editor
//         className=" text-xl "
//         theme={theme}
//         height={height}
//         // width={width}
//         onChange={handleCodeChange}
//         defaultLanguage={DEFAULT_LANGUAGE}
//         language={language ?? DEFAULT_LANGUAGE}
//         value={value || code || ""} // Added value prop
//       />
//     </div>
//   );
// };

// export default CodeEditor;



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
const LOCAL_STORAGE_KEY = "code-editor-content";

const CodeEditor = ({
  language,
  value,
  height = "50vh",
  onChange,
}: Props) => {
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState<string>("");

  // Load saved code from localStorage only on client
  useEffect(() => {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleCodeChange = (value: string | undefined) => {
    try {
      setCode(value || "");
      localStorage.setItem(LOCAL_STORAGE_KEY, value || "");
      if (onChange) {
        onChange(value);
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return (
    <div>
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
          <option value="hc-black">Contrast</option>
        </select>
      </div>

      <Editor
        className="text-xl"
        theme={theme}
        height={height}
        onChange={handleCodeChange}
        defaultLanguage={DEFAULT_LANGUAGE}
        language={language || DEFAULT_LANGUAGE}
        value={value || code}
      />
    </div>
  );
};

export default CodeEditor;
