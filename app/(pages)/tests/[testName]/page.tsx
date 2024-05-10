"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoRadioButtonOnSharp } from "react-icons/io5";

import phq9Sliders from "@/lib/phq9Questions";
import gad7Sliders from "@/lib/gad7Questions";
import dass42Sliders from "@/lib/dass42Questions";

import CompletionPopup from "@/components/mHealthTests/CompletionPopup";

import { useDispatch } from "react-redux";
import { addTestResult } from "@/app/redux/features/auth/authSlice";

interface PageProps {
  params: {
    testName: string;
  };
}

export default function Page({ params }: PageProps) {
  const { testName } = params;
  const dispatch = useDispatch();
  const [selectedTest, setSelectedTest] = useState(null);
  const [testScore, setTestScore] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [showSuccessModel, setShowSuccessModal] = useState(false);

  const tests = {
    PHQ9: phq9Sliders,
    GAD7: gad7Sliders,
    DASS42: dass42Sliders,
  };

  useEffect(() => {
    if (testName) {
      setSelectedTest(tests[testName]);
    }
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { optionText: string; option: number | null }[]
  >([]);

  if (!selectedTest) return;

  const currentQuestion = selectedTest[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < selectedTest.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = answers.reduce((acc, score) => {
        const optionText = score.optionText;
        return acc + scores[optionText];
      }, 0);

      const predict =
        testName === "PHQ9"
          ? determinePHQ9Severity(totalScore)
          : determineGAD7Severity(totalScore);

      setTestScore(totalScore);
      setPrediction(predict);
      setShowSuccessModal(true);

      const responses = selectedTest?.map((item: any, index: number) => {
        return {
          questionText: item.question,
          selectedOptionText: answers[index].optionText,
        };
      });

      const payload = {
        testName: testName,
        score: totalScore,
        prediction: predict,
        date: Date.now(),
        userResponses: responses,
      };
      
      dispatch(addTestResult(payload));
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionClick = (index: number, optionText: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      optionText: optionText,
      option: index,
    };
    setAnswers(updatedAnswers);
  };

  const completedPercentage =
    ((currentQuestionIndex + 1) / selectedTest.length) * 100;

  // Define scores corresponding to each option
  const scores = {
    "Not at all": 0,
    "Several days": 1,
    "More than half of the days": 2,
    "Nearly every day": 3,
  };

  function determinePHQ9Severity(score: number) {
    if (score >= 0 && score <= 4) {
      return "Minimal Depression";
    } else if (score >= 5 && score <= 9) {
      return "Mild Depression";
    } else if (score >= 10 && score <= 14) {
      return "Moderate Depression";
    } else if (score >= 15 && score <= 19) {
      return "Moderately Severe Depression";
    } else if (score >= 20 && score <= 27) {
      return "Severe Depression";
    } else {
      return "Invalid score";
    }
  }

  function determineGAD7Severity(score: number) {
    if (score >= 0 && score <= 4) {
      return "Minimal anxiety";
    } else if (score >= 5 && score <= 9) {
      return "Mild anxiety";
    } else if (score >= 10 && score <= 14) {
      return "Moderate anxiety";
    } else if (score >= 15 && score <= 21) {
      return "Severe anxiety";
    } else {
      return "Invalid score";
    }
  }

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
      <Image src="/logo.png" className="p-14 absolute top-0" width={230} height={230} alt="logo" />
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
                  onClick={() => handleOptionClick(index, option)}
                >
                  <p className="max-w-[88%]">{option}</p>
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
                      {currentQuestionIndex < selectedTest.length - 1
                        ? "Next"
                        : "Continue"}
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
      {showSuccessModel && (
        <CompletionPopup score={testScore} prediction={prediction} />
      )}
    </div>
  );
}
