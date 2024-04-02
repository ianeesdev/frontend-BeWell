import React, { ChangeEvent } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

interface VideoUploaderProps {
  label: string;
  inputId: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  videoSrc: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  label,
  inputId,
  className = "",
  onChange,
  videoSrc
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold">{label}</h2>
      <label
        htmlFor={inputId}
        className={`${className} flex flex-col justify-center items-center rounded-xl group cursor-pointer border-2 border-gray-200`}
      >
        <input
          id={inputId}
          type="file"
          accept="video/*,image/*"
          style={{ display: "none" }}
          onChange={onChange}
        />
        <div className="absolute transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
          <IoCloudUploadSharp size={30} />
          <p className="text-black text-2xl font-semibold">Upload New</p>
        </div>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="object-cover object-center size-full rounded-xl"
        ></video>
      </label>
    </div>
  );
}

export default VideoUploader;
