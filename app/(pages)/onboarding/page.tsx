"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoRadioButtonOnSharp } from "react-icons/io5";

import onboardingSliders from "@/lib/onboardingQuestions";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { saveOnboardingResponses } from "../../redux/features/auth/authSlice";

export default function Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { question: string; option: number | null }[]
  >([]);
  const currentQuestion = onboardingSliders[currentQuestionIndex];

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && user?.onboarded) {
      router.push("/");
    }
  }, [user, isError, isSuccess, message, router, dispatch]);

  const handleNext = () => {
    if (currentQuestionIndex < onboardingSliders.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const payload = {
        userId: user?._id,
        onboardingResponses: answers,
      };
      dispatch(saveOnboardingResponses(payload));
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionClick = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.title,
      option: index,
    };
    setAnswers(updatedAnswers);
  };

  const completedPercentage =
    ((currentQuestionIndex + 1) / onboardingSliders.length) * 100;

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
        <h1 className="text-deepAqua font-bold text-3xl p-14 absolute top-0">
          App Logo Here
        </h1>
        <div className="w-[50%] mx-auto flex flex-col gap-12">
          <div className="text-main flex flex-col gap-10">
            <Progress className="text-deepAqua" value={completedPercentage} />
            <div className="space-y-5 text-center">
              <h2 className="text-2xl font-semibold">
                {currentQuestion.title}
              </h2>
              <p className="text-xl font-semibold">
                {currentQuestion.description}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`${
                    answers[currentQuestionIndex]?.option === index &&
                    "bg-tertiary"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-full w-full text-lg border border-gray-300 px-6 py-4 flex justify-between items-center cursor-pointer`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                  {answers[currentQuestionIndex]?.option === index ? (
                    <IoRadioButtonOnSharp size={35} className="text-deepAqua" />
                  ) : (
                    <FaArrowRightLong className="text-deepAqua" size={35} />
                  )}
                </div>
              ))}

              <div className="flex items-center justify-center gap-6 mt-4">
                <Button variant="outline" onClick={handleBack}>
                  <FaArrowLeftLong size={25} />
                </Button>
                <Button onClick={handleNext}>
                  <div className="flex items-center gap-8">
                    <p>
                      {currentQuestionIndex < onboardingSliders.length - 1
                        ? "Next"
                        : `${isLoading ? "Saving..." : "Continue"}`}
                    </p>
                    <span className="bg-white rounded-full p-2">
                      <FaArrowRightLong size={15} className="text-deepAqua" />
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="p-[5rem] text-center w-[75%] mx-auto space-y-3">
          <h1 className="font-bold text-main text-3xl">Welcome Back!</h1>
          <p className="text-main font-medium text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae{" "}
          </p>
        </div>
        <div>
          <Image
            src="/vector.png"
            width={550}
            height={550}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </div>
  );
}
