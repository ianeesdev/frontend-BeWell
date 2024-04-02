"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import VideoUploader from "@/components/videoAnalysis/VideoUploader";
import Button from "@/components/common/Button";
import axios from "axios";
import ResultPopup from "@/components/videoAnalysis/ResultPopup";

export default function Page() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user?.isLoggedIn) router.push("/auth/login");
  }, [user, router]);

  const [userVideo, setUserVideo] = useState(null);
  const [userVideoUrl, setUserVideoUrl] = useState("");
  const [result, setResult] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const objectURL = URL.createObjectURL(selectedFile);
    setUserVideo(selectedFile);
    setUserVideoUrl(objectURL);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("file", userVideo);

    setIsLoading(true);

    const response = await axios.post(
      "https://d1ce-111-68-99-41.ngrok-free.app/process/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setResult(response.data);
    setIsLoading(false);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
    setUserVideo(null);
    setUserVideoUrl("");
  };

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto gap-5 mt-[3rem]">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">Video Analysis</h1>
        </div>
        <div className="mt-5 size-full flex flex-col gap-5 justify-center items-center">
          <VideoUploader
            label="Upload your video for analysis"
            inputId="userVideo"
            className="w-[50rem] h-[30rem]"
            onChange={handleFileChange}
            videoSrc={userVideoUrl}
          />

          <div>
            <Button onClick={submitHandler}>
              {isLoading ? "Generating Response..." : "Submit Video"}
            </Button>
          </div>
        </div>
        {showPopup && (
          <ResultPopup
            depressionPercentage={result?.depression_anxiety_percentage}
            dominantEmotion={result?.dominant_emotion}
            closeModal={onClose}
          />
        )}
      </div>
    </div>
  );
}
