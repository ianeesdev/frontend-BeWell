import React, { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import ChatCard from "./ChatCard";
import ChatScreen from "./ChatScreen";
import { FaArrowLeftLong } from "react-icons/fa6";

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Renamed state variable

  const handleChatClick = () => {
    setIsOpen(true);
  };

  const handleChatCardClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    setIsChatOpen(false); // Reset state when closing chat
  };

  const messages = [
    {
      content: "I would be glad to help",
      sender: "Kishor",
      time: "Wed 6:55 AM",
    },
    {
      content: "Actually there is.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content:
        "I need to know the privacy policy of your business in a very short summary.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content: "And one more thing.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content: "I would be glad to help",
      sender: "Kishor",
      time: "Wed 6:55 AM",
    },
    {
      content: "Actually there is.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content:
        "I need to know the privacy policy of your business in a very short summary.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content: "And one more thing.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content: "I would be glad to help",
      sender: "Kishor",
      time: "Wed 6:55 AM",
    },
    {
      content: "Actually there is.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content:
        "I need to know the privacy policy of your business in a very short summary.",
      sender: "You",
      time: "Sent 16h ago",
    },
    {
      content: "And one more thing.",
      sender: "You",
      time: "Sent 16h ago",
    },
  ];

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={handleCloseClick}
        ></div>
      ) : null}
      {isOpen ? (
        <div className="w-[27%] fixed bottom-[40px] right-[40px] bg-white rounded-2xl shadow-xl z-50">
          <div className="flex justify-between items-center pb-5 border-b-2 border-gray-200 p-5 shadow-lg">
            <h1 className="text-xl font-bold">
              {isChatOpen ? (
                  <span className="flex gap-2 items-center">
                    <FaArrowLeftLong className="cursor-pointer" onClick={() => setIsChatOpen(false)} />
                    <div className="flex items-center gap-2">
                      <p>Muneeb</p>
                      <p className="text-sm text-faded font-regular">Wed 6:55 AM</p>
                    </div>
                  </span>
        
              ) : (
                "Messages"
              )}
            </h1>
            <div
              className="p-2 rounded-full bg-black"
              onClick={handleCloseClick}
            >
              <FiX size={20} className="text-white cursor-pointer" />
            </div>
          </div>

          <div className="p-5 max-h-[30rem] overflow-auto">
            {isChatOpen ? (
              <ChatScreen messages={messages} />
            ) : (
              <div className="text-black flex flex-col gap-3">
                <ChatCard onClick={handleChatCardClick} />
                <ChatCard onClick={handleChatCardClick} />
                <ChatCard onClick={handleChatCardClick} />
                <ChatCard onClick={handleChatCardClick} />
                <ChatCard onClick={handleChatCardClick} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="fixed bottom-[40px] right-[40px] bg-deepAqua rounded-full p-5 shadow-xl cursor-pointer z-50"
          onClick={handleChatClick}
        >
          <FiMessageSquare size={24} color="#FFFFFF" />
        </div>
      )}
    </>
  );
};

export default ChatIcon;
