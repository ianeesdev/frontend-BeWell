import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  depressionPercentage: number;
  dominantEmotion: string;
  closeModal: () => void;
}

const ResultPopup = ({ depressionPercentage, dominantEmotion, closeModal }: Props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center h-full">
        <div className="bg-white p-14 rounded-2xl flex flex-col justify-center items-center gap-5">
          <Image
            src={"/success.png"}
            className="text-center"
            height={200}
            width={200}
            alt="success image"
          />
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-2xl font-medium">Test Finished</h2>
            <p className="text-xl font-bold">
              Your Despression Score is:{" "}
              <span className="font-bold text-3xl text-deepAqua">
                {depressionPercentage}
              </span>
            </p>
            <p className="text-3xl font-bold text-deepAqua">
              Dominant Emotion: {dominantEmotion}
            </p>
          </div>
          <div
            onClick={closeModal}
            className="border-2 border-seaBlue text-seaBlue rounded-full px-8 py-3 hover:bg-deepAqua hover:text-white hover:border-deepAqua transition-all duration-300 ease-in-out cursor-pointer"
          >
            Go Back
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPopup;
