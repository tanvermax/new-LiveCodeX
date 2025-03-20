
import React from "react";

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


interface LanguageSelectorProps {
  selectedLanguage: keyof typeof languageOptions;
  onChange: (language: keyof typeof languageOptions) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="language" className="block font-bold">Select Language:</label>
      <select
        id="language"
        className="border rounded-md px-3 py-2 w-full"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value as keyof typeof languageOptions)}
      >
        {Object.entries(languageOptions).map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;



