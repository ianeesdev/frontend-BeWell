"use client";

import Navbar from "@/components/common/Navbar";
import QuoteCard from "@/components/resources/QuoteCard";
import VideoCard from "@/components/resources/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";

export default function Page() {
  const [viewAllVideos, setViewAllVideos] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5004/video/getAll");
      console.log(response.data.data);
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex flex-col gap-5 my-[3rem]">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">
            {viewAllVideos ? (
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={() => setViewAllVideos(false)}
              >
                <GoArrowLeft size={30} /> Videos
              </div>
            ) : (
              "Resource Center"
            )}
          </h1>
        </div>

        {viewAllVideos ? (
          <div className="grid grid-cols-3 gap-10">
            {videos &&
              videos?.map((video, index) => (
                <VideoCard
                  key={index}
                  videoId={video?.source}
                  height="300"
                  width="550"
                />
              ))}
          </div>
        ) : (
          <div className="flex items-start gap-10">
            <div className="w-[70%] flex flex-col gap-4">
              <h2 className="font-medium text-[24px]">Videos</h2>
              <div className="grid grid-cols-2 gap-10">
                <VideoCard
                  videoId={videos && videos[0]?.source}
                  height="300"
                  width="550"
                />
                <VideoCard
                  videoId={videos && videos[1]?.source}
                  height="300"
                  width="550"
                />
                <VideoCard
                  videoId={videos && videos[2]?.source}
                  height="300"
                  width="550"
                />
                <div
                  className="h-[300px] w-[550px] bg-aqua rounded-xl flex justify-center items-center cursor-pointer"
                  onClick={() => setViewAllVideos(true)}
                >
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
