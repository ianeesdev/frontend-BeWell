import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatCardProps {
  onClick: () => void;
}

const ChatCard = ({ onClick }: ChatCardProps) => {
  return (
    <div
      className="rounded-2xl p-3 flex gap-3 items-center shadow-sm hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <Avatar className="h-16 w-16 rounded-xl">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-semibold text-lg">Muneeb ur Rehman</h1>
        <p className="text-faded">Haha oh man🔥🔥🔥🔥</p>
      </div>
    </div>
  );
};

export default ChatCard;
