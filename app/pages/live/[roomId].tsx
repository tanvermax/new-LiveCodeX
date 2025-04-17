// app/live/[roomId]/page.tsx (or pages/live/[roomId].tsx)
"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("@/component/shared/CodeEditor"), { ssr: false });

export default function LivePage() {
  const { roomId } = useParams();

  if (!roomId || typeof roomId !== "string") return null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Live Code Room: {roomId}</h1>
      <CodeEditor language="javascript" roomId={roomId} />
    </div>
  );
}
