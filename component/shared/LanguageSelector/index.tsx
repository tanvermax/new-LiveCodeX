
import React from "react";

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


interface LanguageSelectorProps {
  selectedLanguage: keyof typeof languageOptions;
  onChange: (language: keyof typeof languageOptions) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onChange }) => {
  return (
    <div className="flex flex-col items-start justify-start ">
      <div></div>
      <div className="mb-4 max-w-2xs">
        {/* <label htmlFor="language" className="block font-bold">Select Language:</label> */}
        <select
          id="language"
          className="border rounded-md px-3 py-2 w-full "
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
    </div>
  );
};

export default LanguageSelector;



