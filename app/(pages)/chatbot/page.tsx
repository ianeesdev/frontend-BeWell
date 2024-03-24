"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import InputField from "@/components/common/InputField";
import Image from "next/image";

import { LuSendHorizonal } from "react-icons/lu";
import Button from "@/components/common/Button";
import QuestionBox from "@/components/chatbot/QuestionBox";
import AnswerBox from "@/components/chatbot/AnswerBox";

export default function Page() {
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto mt-[3rem]">
        {false ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <div>
              <Image
                src="/chatbot-vector.png"
                width={350}
                height={350}
                className="hidden md:block"
                alt="Screenshots of the dashboard project showing desktop version"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-gray-100 rounded-xl">
                <p className="max-w-[30rem] p-6">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis dicta minima esse quae repellendus.
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl">
                <p className="max-w-[30rem] p-6">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis dicta minima esse quae repellendus.
                </p>
              </div>

              <p className="text-faded text-center">
                This is example that what can i do for you.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <QuestionBox questionText="What is your purpose?" />
            <AnswerBox answerText="Al can analyze user data and behavior to create personalized experiences for individual users. This can help designers create interfaces that adapt to each user’s preferences, making the interface   more intuitive and user-friendly. Al can analyze user data and behavior to create personalized experiences for individual users. This can help designers create interfaces that adapt to each user’s preferences, making the interface more intuitive and user-friendly.Al can analyze user data and behavior to create personalized experiences for individual users" />
          </div>
        )}

        <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-6 w-[80%] mx-auto">
          <div className="flex gap-4 w-full">
            <InputField
              type="text"
              className="drop-shadow-lg py-4"
              placeholder="Ask me anything regarding mental health"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button className="">
              <LuSendHorizonal size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
