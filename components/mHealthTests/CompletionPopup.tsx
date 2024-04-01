import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
    score: number,
    prediction: string
}

const CompletionPopup = ({score = 20, prediction} : Props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      <div className="absolute z-50 flex items-center justify-center size-full">
        <div className="bg-white p-14 rounded-2xl flex flex-col justify-center items-center gap-5">
            <Image src={"/success.png"} className="text-center" height={200} width={200} alt="success image" />
            <div className="text-center flex flex-col gap-3">
                <h2 className="text-2xl font-medium">Test Finished</h2>
                <p className="text-xl font-bold">Your Score is: <span className="font-bold text-3xl text-deepAqua">{score}</span></p>
                <p className="text-3xl font-bold text-deepAqua">{prediction}</p>
            </div>
            <Link href={"/tests"} className="border-2 border-seaBlue text-seaBlue rounded-full px-8 py-3 hover:bg-deepAqua hover:text-white hover:border-deepAqua transition-all duration-300 ease-in-out">Go Back To HomePage</Link>
        </div>
      </div>
    </>
  );
};

export default CompletionPopup;
