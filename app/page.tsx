
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CodeEditor } from "@/component/shared/CodeEditor";
import LanguageSelector from "@/component/shared/LanguageSelector";
import Banner from "../component/Banner";
import Courses from "@/component/Courses";
import Testimonials from "@/component/Testimonials";
import Feature from "@/component/Feature";

const languageOptions = {
  javascript: { id: 63, name: "JavaScript" },
  python: { id: 71, name: "Python" },
  cpp: { id: 54, name: "C++" },
  java: { id: 62, name: "Java" },
  c: { id: 50, name: "C" },
  csharp: { id: 51, name: "C#" },
  ruby: { id: 72, name: "Ruby" },
  swift: { id: 83, name: "Swift" },
  php: { id: 68, name: "PHP" },
  typescript: { id: 74, name: "TypeScript" },
  go: { id: 60, name: "Go" },
  rust: { id: 73, name: "Rust" },
  kotlin: { id: 78, name: "Kotlin" },
  r: { id: 80, name: "R" },
  dart: { id: 90, name: "Dart" },
  perl: { id: 85, name: "Perl" },
  lua: { id: 64, name: "Lua" },
  pascal: { id: 93, name: "Pascal" },
  scala: { id: 81, name: "Scala" },
  objectivec: { id: 79, name: "Objective-C" },
  bash: { id: 46, name: "Bash" },
  clojure: { id: 91, name: "Clojure" },
  haskell: { id: 61, name: "Haskell" },
  fortran: { id: 59, name: "Fortran" },
  julia: { id: 87, name: "Julia" },
  fsharp: { id: 86, name: "F#" },
  scheme: { id: 88, name: "Scheme" },
  lisp: { id: 89, name: "Lisp" },
  prolog: { id: 69, name: "Prolog" },
  sql: { id: 82, name: "SQL" },
} as const;

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState<keyof typeof languageOptions>("javascript");
  const [code, setCode] = useState<string>("console.log('Hello, World!');");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || ""; // Load API key from .env

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center p-4">Multi-Language Code Editor</h1>

      <div className="text-left">
        <LanguageSelector
          selectedLanguage={language}
          onChange={(lang) => setLanguage(lang as keyof typeof languageOptions)}
        />

        <CodeEditor language={language} value={code} onChange={(value) => setCode(value ?? "")} />

        <button
          onClick={runCode}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>

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


