"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function EditorHomePage() {
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    router.push(`/editor/${roomId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">LiveCodeX - Real-Time Editor</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleCreateRoom}
      >
        ➕ Create New Collaboration Room
      </button>
    </div>
  );
}
