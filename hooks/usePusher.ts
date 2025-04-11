"use client"
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

export function usePusher(room: string) {
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);

  useEffect(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe(room);

    channel.bind("new-message", (data: { username: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [room]);

  return messages;
}
