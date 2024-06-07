"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import VideoUploader from "@/components/videoAnalysis/VideoUploader";
import Button from "@/components/common/Button";
import ResultPopup from "@/components/videoAnalysis/ResultPopup";

import { addAnalysisResult } from "./redux/features/auth/authSlice";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user?.isLoggedIn) router.push("/landingPage");
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

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://2318-203-175-78-1.ngrok-free.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data)
      const data = response.data;
  
      setResult(data);
      setIsLoading(false);
      setShowPopup(true);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message)
    }

    // const payload = {
    //   date: Date.now(),
    //   depressionPercentage: data?.depression_anxiety_percentage,
    //   dominantEmotion: data?.dominant_emotion,
    // };
    // dispatch(addAnalysisResult(payload));
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
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Video Analysis</h1>
            <Link href="/analysisHistory">
              <Button variant="outline">View History</Button>
            </Link>
          </div>
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
