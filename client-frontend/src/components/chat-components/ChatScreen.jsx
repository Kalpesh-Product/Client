import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User", text: "Hello! How are you?" },
    {
      id: 2,
      sender: "Bot",
      text: "I'm good, thanks! How can I assist you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "User",
        text: newMessage,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="sticky top-[3.7rem] z-10 py-4 px-6 bg-blue-600 text-white text-lg font-semibold">
        Chat with Support
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === "User"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="rounded-full ml-2 p-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}
