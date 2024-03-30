import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbStarHalfFilled } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import Button from "../common/Button";
import { useSelector } from "react-redux";

interface AppointmentCardProps {
  name: string;
  specialty: string;
  location: string;
  rating: number;
  appointmentDate: string;
  appointmentTime: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  name,
  specialty,
  location,
  rating,
  appointmentDate,
  appointmentTime,
}) => {

  const { user, isLoading } = useSelector((state: any) => state.auth);
  return (
    <div className="rounded-3xl overflow-hidden px-5 py-2.5 border-gray-300 border-[1px]">
      <div className="flex items-center">
        <div className="flex items-center gap-5 w-[30%]">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl text-main font-medium">{name}</p>
            <p className="text-faded">{`${specialty}`}</p>
            <p className="text-faded">{`${location}`}</p>
          </div>
        </div>
        <div className="border-l-2 border-gray-300 flex justify-between items-center px-8 w-[70%] ms-auto">
          <div className="flex items-center gap-2">
            <LuCalendarClock size={30} />
            <div className="text-lg text-main font-medium">
              <p>{appointmentDate}</p>
              <p>{appointmentTime}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="px-10 py-2" onClick={() => createMeeting()}>
              Join Now
            </Button>
            <Button variant="primary" className="px-10 py-2">
              View Details
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center px-2 pt-1">
        <TbStarHalfFilled size={25} className="text-seaBlue" />
        <p className="text-seaBlue text-lg">{rating}</p>
      </div>
    </div>
  );
};

export default AppointmentCard;
