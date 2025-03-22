"use client";

import React, { useEffect, useState } from 'react';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import {socket} from "../lib/socketClient";

const Chat = () => {
    const [room, setRoom] = useState<string>("");
    const [join, setJoin] = useState<boolean>(false);
    const [messages, setMessages] = useState<{ sender: string, message: string }[]>([]);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        })

        socket.on("user_joined", (message) => {
            setMessages((prev) => [...prev, {sender:"system", message}])
        })

        return () => {
            socket.off("user_joined");
            socket.off("message");
        }

    }, []);


    const handleJoinRoom = () => {
        if(room && userName) {
            socket.emit("join-room", {room, userName});
            setJoin(true);
        }
    }
    const handleSendMessage = (message: string) => {
        const data = {room, message, sender: userName}
        setMessages((prev) => [...prev, {sender: userName, message}])
        socket.emit("message", data);
    }



    return (
        <div className="flex mt-24 justify-center w-full">
            {!join ? (<div className='flex flex-col w-full max-w-3xl mx-auto items-center '>
                <h1 className='mb-4 text-2xl font-bold'>Join in a chat room</h1>
                <input type="text" placeholder='Enter your username' value={userName} onChange={(e) => setUserName(e.target.value)} 
                className='w-64 px-4 py-2 mb-4 border rounded-lg ' />

                <input type="text" placeholder='Enter room name' value={room} onChange={(e) => setRoom(e.target.value)} 
                className='w-64 px-4 py-2 mb-4 border rounded-lg ' />

            <button
            onClick={handleJoinRoom}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer'>
                Join Room
            </button>
                

            </div>) : (

                <div className='w-full max-w-3xl mx-auto'>

                    <h1 className='mb-4 text-2xl font-bold'>Room: {room}</h1>
                    <div className='h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg'>
                        {messages.map((message, index) => (
                            <ChatMessage key={index} sender={message.sender} message={message.message} isOwnMessage={message.sender === userName} />
                        ))}
                    </div>
                    <ChatForm onSendMessage={handleSendMessage} />
                </div>
            )}

        </div>
    );
};

export default Chat;