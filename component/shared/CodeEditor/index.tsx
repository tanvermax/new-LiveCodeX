"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { io, Socket } from "socket.io-client"; // 🔥 Added

type Props = {
  language: string;
  value?: string;
  height?: string;
  roomId?: string; // 🔥 Added for collaboration
  onChange?: (value: string | undefined) => void;
};

const DEFAULT_LANGUAGE = "javascript";
const LOCAL_STORAGE_KEY = "code-editor-content";

let socket: Socket; // 🔥 Added

const CodeEditor = ({
  language,
  value,
  height = "50vh",
  roomId, // 🔥 Added
  onChange,
}: Props) => {
  const [theme, setTheme] = useState("vs-dark");

  const [code, setCode] = useState<string>(() => {
    // 🔥 Modified to support SSR-safe localStorage access
    return typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY) || ""
      : "";
  });

  const skipEmitRef = useRef(false); // 🔥 Added

  // 🔥 Setup Socket.IO connection and listeners
  useEffect(() => {
    socket = io({
      path: "http://localhost:3000/api/socketio", // adjust if needed
    });

    socket.emit("join_room", roomId); // 🔥 Join a specific room

    socket.on("receive_code", (incomingCode: string) => {
      if (incomingCode !== code) {
        skipEmitRef.current = true; // 🔥 Prevent echo
        setCode(incomingCode);
        localStorage.setItem(LOCAL_STORAGE_KEY, incomingCode);
      }
    });

    return () => {
      socket.disconnect(); // 🔥 Cleanup
    };
  }, [roomId,code]);


  // useEffect(() => {
  //   if (!roomId) return;
  
  //   const socket = io({ path: "http://localhost:3000/api/socketio" });
  
  //   socket.on("connect", () => {
  //     console.log("Connected with socket ID:", socket.id);
  //     socket.emit("join_room", roomId);
  //   });
  
  //   socket.on("receive_code", (incomingCode) => {
  //     if (incomingCode !== code) {
  //       setCode(incomingCode);
  //     }
  //   });
  
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [roomId,code]);

  // Theme selection
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  // 🔥 Modified to emit code changes through socket
  const handleCodeChange = (value: string | undefined) => {
    try {
      const newCode = value || "";
      setCode(newCode);
      localStorage.setItem(LOCAL_STORAGE_KEY, newCode);

      if (onChange) {
        onChange(newCode);
      }

      // 🔥 Emit only if not from socket
      if (!skipEmitRef.current) {
        socket.emit("code_change", { roomId, code: newCode });
      } else {
        skipEmitRef.current = false;
      }
    } catch (error) {
      console.error("Error in code change handler:", error);
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
          <option value="hc-black">Contrast</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <Editor
        className="text-xl"
        theme={theme}
        height={height}
        onChange={handleCodeChange}
        defaultLanguage={DEFAULT_LANGUAGE}
        language={language ?? DEFAULT_LANGUAGE}
        value={code}
      />
    </div>
  );
};

export default CodeEditor;
