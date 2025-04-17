"use client";

import { useParams } from "next/navigation";
import CodeEditor from "@/component/shared/CodeEditor";

export default function EditorRoomPage() {
  const { roomId } = useParams();

  if (!roomId || typeof roomId !== "string") {
    return <div>Invalid room ID</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Collaboration Room: {roomId}
      </h2>
      <CodeEditor language="javascript" roomId={roomId} />
    </div>
  );
}
