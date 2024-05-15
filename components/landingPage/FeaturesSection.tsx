import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="bg-featuresBg bg-no-repeat bg-cover w-full h-screen flex items-center justify-center">
      <div className="w-[85%] mx-auto flex flex-col gap-8">
        <h1 className="text-white text-[50px] font-bold text-center">
          Key Features
        </h1>
        <div className="grid grid-cols-3 gap-10">
          <FeatureCard title="Assessment Tests" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Video Analysis" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Emotions Detection" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Appointment Booking" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Community Forum" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Resource Center" content="" SVG="AnalysisSvg" />
          <FeatureCard title="AI Chatbot" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Therapist Portal" content="" SVG="AnalysisSvg" />
          <FeatureCard title="Recommendation System" content="" SVG="AnalysisSvg" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
