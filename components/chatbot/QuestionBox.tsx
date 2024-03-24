import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface QuestionBoxProps {
  questionText: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ questionText }) => {
  return (
    <div className="bg-white p-6">
      <div className="flex gap-4 items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg font-medium">{questionText}</p>
      </div>
    </div>
  );
};

export default QuestionBox;
