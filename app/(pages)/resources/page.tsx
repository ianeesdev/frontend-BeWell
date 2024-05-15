"use client";

import Navbar from "@/components/common/Navbar";
import QuoteCard from "@/components/resources/QuoteCard";
import VideoCard from "@/components/resources/VideoCard";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";

export default function Page() {
  const [viewAllVideos, setViewAllVideos] = useState(false);

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex flex-col gap-5 my-[3rem]">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">
            {viewAllVideos ? 
              <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setViewAllVideos(false)}>
            <GoArrowLeft size={30} /> Videos
          </div> : "Resource Center"}
          </h1>
        </div>

        {viewAllVideos ? (
          <div className="grid grid-cols-3 gap-10">
            <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
            <VideoCard videoId="DxIDKZHW3-E" height="300" width="550" />
            <VideoCard videoId="2XZNNZnGhGY" height="300" width="550" />
            <VideoCard videoId="p_KOXPC3dh4" height="300" width="550" />
            <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
            <VideoCard videoId="nCrjevx3-Js" height="300" width="550" />
            <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
            <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
            <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
          </div>
        ) : (
          <div className="flex items-start gap-10">
            <div className="w-[70%] flex flex-col gap-4">
              <h2 className="font-medium text-[24px]">Videos</h2>
              <div className="grid grid-cols-2 gap-10">
                <VideoCard videoId="G0zJGDokyWQ" height="300" width="550" />
                <VideoCard videoId="wo4M7HORYEo" height="300" width="550" />
                <VideoCard videoId="nCrjevx3-Js" height="300" width="550" />
                <div className="h-[300px] w-[550px] bg-aqua rounded-xl flex justify-center items-center cursor-pointer" onClick={() => setViewAllVideos(true)}>
                  <p className="text-deepAqua text-[20px]">View More</p>
                </div>
              </div>
            </div>

            <div className="w-[30%] flex flex-col gap-4">
              <h2 className="font-medium text-[24px]">Quotes</h2>
              <div className="space-y-5">
                <QuoteCard text="“It is better to conquer yourself than to win a thousand battles”" />
                <QuoteCard text="“It is better to conquer yourself than to win a thousand battles”" />
                <QuoteCard text="“It is better to conquer yourself than to win a thousand battles”" />
                <QuoteCard text="“It is better to conquer yourself than to win a thousand battles”" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
