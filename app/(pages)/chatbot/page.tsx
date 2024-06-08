"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import InputField from "@/components/common/InputField";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { LuSendHorizonal } from "react-icons/lu";
import Button from "@/components/common/Button";
import QuestionBox from "@/components/chatbot/QuestionBox";
import AnswerBox from "@/components/chatbot/AnswerBox";

import axios from "axios";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user?.isLoggedIn) router.push("/auth/login");
  }, [user, router]);

  const getResponse = async (event: any) => {
    event.preventDefault();
    setMessages([
      ...messages,
      {
        id: crypto.randomUUID(),
        text: prompt,
        sender: "user",
      },
    ]);
    setPrompt("");

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://37df-111-68-99-41.ngrok-free.app/query",
        {
          query: prompt,
          session: "hi"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data)
      const aiResponse = response.data.answer;

      console.log(aiResponse);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          text: aiResponse,
          sender: "bot",
        }
      ]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
      console.error("Error in sending message:", error);
    }
  };

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto mt-[3rem]">
        {messages.length == 0 ? (
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
            {
              isLoading ? "Generating response" : 
              messages.map((message, index) => (
                message?.sender === "user" ? (
                  <QuestionBox key={index} questionText={message?.text} />
                ) : (
                  <AnswerBox key={index} answerText={message.text} />
                )
              ))
            }
          </div>
        )}

        <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-6 w-[80%] mx-auto">
          <form onSubmit={getResponse} className="flex gap-4 w-full">
            <InputField
              type="text"
              className="drop-shadow-lg py-4"
              placeholder="Ask me anything regarding mental health"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button type="submit" className="">
              <LuSendHorizonal size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
