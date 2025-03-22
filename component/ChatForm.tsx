"use client";
import React, { useState } from 'react';

const ChatForm = ({ onSendMessage }: { onSendMessage: (message: string) => void; }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
            <input
                onChange={(e) => setMessage(e.target.value)} className='flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none' type="text" placeholder='Type your message here...' />

            <button type='submit' className='px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer'>
                Send
            </button>

        </form>
    );
};

export default ChatForm;