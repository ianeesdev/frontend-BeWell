"use client";

import React, { useState } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

import { FaAngleLeft } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
        <h1 className="text-deepAqua font-bold text-3xl p-14 absolute top-0">
          App Logo Here
        </h1>
        <div className="w-[50%] mx-auto flex flex-col gap-12">
          <div className="text-main flex flex-col gap-10">
            <Progress className="text-deepAqua" value={33} />
            <div className="space-y-5">
              <h2 className="text-4xl font-semibold flex gap-x-2 items-center -ms-2">
                <Link href={"/auth/login"}>
                  <FaAngleLeft size={35} />
                </Link>{" "}
                Forget Password
              </h2>
              <p className="text-lg">
                Enter your email for the verification process, we will send 4
                digits code to your email.
              </p>
            </div>
          </div>
          <div>
            <form action="" className="flex flex-col gap-9">
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button children={"Get Code"} variant="primary" />
            </form>
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
