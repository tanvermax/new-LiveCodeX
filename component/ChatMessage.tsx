import React from 'react';

interface ChatMessageProps {
    message: string;
    sender: string;
    isOwnMessage: boolean;

}

const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
    const isSystemMessage = sender === "system";

    return (
        <div className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${isSystemMessage ? "bg-gray-800 text-white text-center text-xs" : isOwnMessage ? "bg-blue-500 text-white rounded-br-sm" : "bg-gray-300 text-black rounded-bl-sm"}`}>
                {!isSystemMessage && <p className="text-sm font-semibold mb-1">{sender}</p>}
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
