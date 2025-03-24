
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "@/component/shared/LanguageSelector";
import Banner from "../component/Banner";
import Courses from "@/component/Courses";
import Testimonials from "@/component/Testimonials";
import Feature from "@/component/Feature";
import CodeEditor from "@/component/shared/CodeEditor";

const languageOptions = {
  c: { id: 50, name: "C", extension: "c", boilerplate: "#include<stdio.h>\n\nint main()\n{\n\tprintf(\"Hello, World! from C\");\n\treturn 0;\n}" },
  cpp: { id: 54, name: "C++", extension: "cpp", boilerplate: "#include<iostream>\n\nint main()\n{\n\tstd::cout << \"Hello, World! from C++\";\n\treturn 0;\n}" },
  python: { id: 71, name: "Python", extension: "py", boilerplate: "print(\"Hello, World! from Python\")" },
  java: { id: 62, name: "Java 14", extension: "java", boilerplate: "public class Main {\n\tpublic static void main(String args[]) {\n\t\tSystem.out.print(\"Hello, World! from Java 14\");\n\t}\n}" },
  javascript: { id: 63, name: "JavaScript", extension: "js", boilerplate: "console.log(\"Hello, World! from JavaScript\");" },
  csharp: { id: 51, name: "C#", extension: "cs", boilerplate: "using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine(\"Hello, World! from C#\");\n\t}\n}" },
  ruby: { id: 72, name: "Ruby", extension: "rb", boilerplate: "puts 'Hello, World! from Ruby'" },
  swift: { id: 83, name: "Swift", extension: "swift", boilerplate: "import Foundation\n\nprint(\"Hello, World! from Swift\")" },
  php: { id: 68, name: "PHP", extension: "php", boilerplate: "<?php\n\necho 'Hello, World! from PHP';\n?>" },
  typescript: { id: 74, name: "TypeScript", extension: "ts", boilerplate: "console.log('Hello, World! from TypeScript');" },
  go: { id: 60, name: "Go", extension: "go", boilerplate: "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World! from Go\")\n}" },
  rust: { id: 73, name: "Rust", extension: "rs", boilerplate: "fn main() {\n\tprintln!(\"Hello, World! from Rust\");\n}" },
  kotlin: { id: 78, name: "Kotlin", extension: "kt", boilerplate: "fun main() {\n\tprintln(\"Hello, World! from Kotlin\")\n}" },
  r: { id: 80, name: "R", extension: "r", boilerplate: "cat('Hello, World! from R')\n" },
  dart: { id: 90, name: "Dart", extension: "dart", boilerplate: "void main() {\n\tprint('Hello, World! from Dart');\n}" },
  perl: { id: 85, name: "Perl", extension: "pl", boilerplate: "print \"Hello, World! from Perl\\n\";" },
  lua: { id: 64, name: "Lua", extension: "lua", boilerplate: "print(\"Hello, World! from Lua\")" },
  pascal: { id: 93, name: "Pascal", extension: "pas", boilerplate: "program Hello;\nbegin\n\twriteln('Hello, World! from Pascal');\nend." },
  scala: { id: 81, name: "Scala", extension: "scala", boilerplate: "object HelloWorld {\n\tdef main(args: Array[String]): Unit = {\n\t\tprintln(\"Hello, World! from Scala\")\n\t}\n}" },
  objectivec: { id: 79, name: "Objective-C", extension: "m", boilerplate: "#import <stdio.h>\n\nint main() {\n\tprintf(\"Hello, World! from Objective-C\");\n\treturn 0;\n}" },
  bash: { id: 46, name: "Bash", extension: "sh", boilerplate: "echo 'Hello, World! from Bash'" },
  clojure: { id: 91, name: "Clojure", extension: "clj", boilerplate: "(println \"Hello, World! from Clojure\")" },
  haskell: { id: 61, name: "Haskell", extension: "hs", boilerplate: "main = putStrLn \"Hello, World! from Haskell\"" },
  fortran: { id: 59, name: "Fortran", extension: "f90", boilerplate: "program hello\n\tprint *, 'Hello, World! from Fortran'\nend program hello" },
  julia: { id: 87, name: "Julia", extension: "jl", boilerplate: "println(\"Hello, World! from Julia\")" },
  fsharp: { id: 86, name: "F#", extension: "fs", boilerplate: "open System\n\nprintfn \"Hello, World! from F#\"" },
  scheme: { id: 88, name: "Scheme", extension: "scm", boilerplate: "(display \"Hello, World! from Scheme\")" },
  lisp: { id: 89, name: "Lisp", extension: "lisp", boilerplate: "(print \"Hello, World! from Lisp\")" },
  prolog: { id: 69, name: "Prolog", extension: "pl", boilerplate: ":- write('Hello, World! from Prolog'), nl." },
  sql: { id: 82, name: "SQL", extension: "sql", boilerplate: "SELECT 'Hello, World! from SQL';" }
} as const;

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState<keyof typeof languageOptions>("javascript");
  const [code, setCode] = useState<string>(languageOptions[language].boilerplate);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || ""; // Load API key from .env

  useEffect(() => {
    setIsClient(true);

    const savedCode = localStorage.getItem("code-editor-content");
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Auto-save code to localStorage whenever it changes
  useEffect(() => {
    if (code) {
      localStorage.setItem("code-editor-content", code);
    }
  }, [code]);


  const handleLanguageChange = (lang: keyof typeof languageOptions) => {
    setLanguage(lang);
    setCode(languageOptions[lang].boilerplate);
  };

  const runCode = async () => {
    if (!API_KEY) {
      setOutput("Error: API Key is missing. Set NEXT_PUBLIC_RAPIDAPI_KEY in .env.local");
      return;
    }

    const languageId = languageOptions[language].id;
    const requestData = { source_code: code, language_id: languageId, stdin: "" };

    try {
      setOutput("Running...");
      setIsLoading(true);

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        requestData,
        {
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;

      const fetchOutput = async () => {
        try {
          const result = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            {
              headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": API_KEY,
              },
            }
          );

          if (result.data.status.id <= 2) {
            setTimeout(fetchOutput, 5000); // Increased delay to 5s to avoid rate limits
          } else {
            setOutput(result.data.stdout || result.data.stderr || "No output");
            setIsLoading(false);
          }
        } catch (err) {
          setOutput("Error fetching output. Try again.");
          setIsLoading(false);
        }
      };

      fetchOutput();
    } catch (error: any) {
      if (error.response?.status === 429) {
        setOutput("Rate limit exceeded! Try again later.");
      } else {
        setOutput(`Error: ${error.message}`);
      }
      setIsLoading(false);
    }
  };


  const downloadCode = () => {
    const fileExtension = languageOptions[language].extension;
    const fileName = `code.${fileExtension}`;
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadCode = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  if (!isClient) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center p-4">Multi-Language Code Editor</h1>

      <div className="text-left">
  
        <LanguageSelector selectedLanguage={language} onChange={handleLanguageChange} />

        <CodeEditor language={language} value={code} onChange={(value) => setCode(value ?? "")} />

        <div className="flex space-x-3 mt-3">
          <button
            onClick={runCode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>

          <button
            onClick={downloadCode}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Download Code
          </button>

          <input
            type="file"
            accept=".js,.py,.cpp,.java,.c,.cs,.rb,.swift,.php,.ts,.go,.rs,.kt,.r,.dart,.pl,.lua,.pas,.scala,.m,.sh,.clj,.hs,.f90,.jl,.fs,.scm,.lisp,.sql"
            onChange={uploadCode}
            className="px-4 py-2 bg-gray-200 text-black rounded-md cursor-pointer"
          />
        </div>

        <div className="bg-gray-900 text-white p-3 rounded-md min-h-[100px] mt-3">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      </div>
      <Banner />
      <Courses />
      <Testimonials />
      <Feature />
    </div>
  );
}





