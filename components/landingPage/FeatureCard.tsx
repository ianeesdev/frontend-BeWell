import React from "react";
import AnalysisSvg from "../svgs/AnalysisSvg";
import ChatbotSvg from "../svgs/ChatbotSvg";
import ResourceSvg from "../svgs/ResourceSvg";
import TestSvg from "../svgs/TestSvg";
import { MdGroups2 } from "react-icons/md";
import { PiNotebook } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";

interface FeatureCardProps {
  title: string;
  content: string;
  SVG: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, content, SVG }) => {
  return (
    <div className="bg-main rounded-2xl p-6 max-w-[450px] flex flex-col gap-8 items-start bg-gradient-to-r from-[#011C2F] to-[#011C2F] hover:from-[#1D6C86] hover:to-[#DBFFFB] transition-all duration-1000 ease-in-out">
      <div className="bg-deepAqua p-6 rounded-full text-center">
        {title === "Assessment Tests" && <TestSvg />}
        {title === "Video Analysis" && <AnalysisSvg />}
        {title === "Emotions Detection" && <SlEmotsmile size={35} className="text-white" />}
        {title === "Appointment Booking" && <PiNotebook size={35} className="text-white" />}
        {title === "Community Forum" && <MdGroups2 size={35} className="text-white" />}
        {title === "Resource Center" && <ResourceSvg />}
        {title === "AI Chatbot" && <ChatbotSvg />}
        {title === "Therapist Portal" && <FaUserDoctor size={35} className="text-white" />}
        {title === "Recommendation System" && <MdOutlineSettingsSuggest size={35} className="text-white" />}
      </div>

      <div className="text-white space-y-1.5">
        <h1 className="text-[24px] font-semibold">{title}</h1>
        <p className="text-[16px]">{content}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
