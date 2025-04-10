// app/chat/Chat.tsx
"use client";

import { useState } from "react";
import { usePusher } from "@/hooks/usePusher";

export default function Chat({ room }: { room: string | any }) {
  const [message, setMessage] = useState("");
  const messages = usePusher(room);

  const sendMessage = async () => {
    if (!message) return;
    await fetch("/pages/api/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, username: "User1", room }),
    });
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border p-4 rounded h-80 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            <strong className="text-blue-600">{msg.username}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
