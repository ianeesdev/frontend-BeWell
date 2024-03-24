"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import Link from "next/link";

import { FaAngleLeft } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Page() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { user } = useSelector(
    (state: any) => state.auth
  );

  const handleInputChange = (index: number, value: string) => {
    const updatedOtp = otp.split("");
    updatedOtp[index] = value;
    setOtp(updatedOtp.join(""));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setOtp("");

    if (user?.otp == otp) {
      router.push("/auth/reset-password")
    } else {
      alert("Invalid OTP. Try Again.")
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
        <h1 className="text-deepAqua font-bold text-3xl p-14 absolute top-0">
          App Logo Here
        </h1>
        <div className="w-[50%] mx-auto flex flex-col gap-9">
          <div className="text-main flex flex-col gap-10">
            <Progress className="text-deepAqua" value={66} />
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold flex gap-x-2 items-center -ms-2">
                <Link href={"/auth/forget-password"}>
                  <FaAngleLeft size={35} />
                </Link>{" "}
                Enter 4 digit Code
              </h2>
              <p className="text-lg">
                Enter the 4 digits code that you received on your email.
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-12">
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((index) => (
                  <div className="w-20 h-20">
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      className="w-full h-full text-center px-5 outline-none rounded-xl border border-gray-300 text-3xl font-bold text-deepAqua bg-white focus:border-none focus:bg-tertiary focus:ring-2 ring-deepAqua "
                      type="text"
                      maxLength={1}
                      onChange={(e) =>
                        handleInputChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
              </div>
              <Button type="submit">{isLoading ? "Verifying" : "Continue"}</Button>
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
