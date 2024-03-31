import React, { useState, useEffect, useRef } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { IoSend } from "react-icons/io5";

interface Message {
  content: string;
  sender: string;
  time: string;
}

const ChatScreen: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSend = () => {
    setNewMessage("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-2 mb-[5.5rem]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center p-1 ${
              message.sender === "You" && "justify-end"
            }`}
          >
            <p
              className={`max-w-[75%] mr-2 px-4 py-3 rounded-tl-2xl rounded-tr-2xl text-base text-white ${
                message.sender === "You"
                  ? "bg-deepAqua rounded-bl-2xl"
                  : "bg-surface rounded-br-2xl"
              }`}
            >
              {message.content}
            </p>
            {/* <span className="text-gray-500 text-sm">{message.time}</span> */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-5 right-1 py-4 flex items-center bg-white">
        <InputField
          type="text"
          placeholder="Send a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button className="bg-white" onClick={handleMessageSend}>
          <IoSend size={30} className="text-deepAqua" />
        </Button>
      </div>
    </div>
  );
};

export default ChatScreen;
