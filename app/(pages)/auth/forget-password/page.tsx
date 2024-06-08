"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import Link from "next/link";

import { FaAngleLeft } from "react-icons/fa6";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export default function Page() {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      router.push("/auth/verify-otp")
    }

  }, [isError, isSuccess, message, router, dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(forgotPassword({email: email}));
  };

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
        <Image src="/logo.png" className="p-14 absolute top-0" width={230} height={230} alt="logo" />
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit">{isLoading? "Sending code..." : "Get Code"}</Button>
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
