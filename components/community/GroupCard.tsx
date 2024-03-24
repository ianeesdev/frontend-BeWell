import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GroupCardProps {
  groupName: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName }) => {
  return (
    <div className="p-2 flex items-center gap-3 rounded-xl hover:bg-aqua cursor-pointer">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-lg font-medium">{groupName}</p>
    </div>
  );
};

export default GroupCard;
