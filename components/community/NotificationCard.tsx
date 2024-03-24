import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationCardProps {
  personName: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ personName }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-aqua cursor-pointer">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{personName} replied to your thread</p>
    </div>
  );
};

export default NotificationCard;
