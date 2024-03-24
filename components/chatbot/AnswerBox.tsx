import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AnswerBoxProps {
  answerText: string;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ answerText }) => {
  return (
    <div className="w-[96%] mx-auto p-6 border-2 border-gray-200 rounded-xl">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xl font-medium">Chatbot</p>
        </div>
        <p className="text-lg text-justify">{answerText}</p>
      </div>
    </div>
  );
};

export default AnswerBox;
