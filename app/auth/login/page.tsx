"use client";

import React, { useState } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import GoogleSvg from "@/components/svgs/GoogleSvg";

import Image from "next/image";
import Link from "next/link";
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
        <h1 className="text-deepAqua font-bold text-3xl p-14 absolute top-0">
          App Logo Here
        </h1>
        <div className="w-[50%] mx-auto flex flex-col gap-12">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-main font-semibold">Login</h2>
            <Link
              href={"/auth/register"}
              className="text-lg text-deepAqua font-medium"
            >
              Register
            </Link>
          </div>
          <div>
            <form action="" className="flex flex-col gap-7">
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button children={"Login"} variant="primary" />
            </form>
            <p className="text-gray-400 p-4">
              Forgot Password?
              <Link href={"/auth/forget-password"} className="text-deepAqua font-bold text-lg ms-2">Click Here</Link>
            </p>
          </div>

          <div className="-mt-3">
            <h1 className="flex items-center ">
              <span className="flex-1 border-b-2 border-solid border-light-purple mr-3"></span>
              or Sign In with
              <span className="flex-1 border-b-2 border-solid border-light-purple ml-3"></span>
            </h1>
          </div>

          <Button variant="outline">
            <a href={""} className="flex items-center justify-center gap-x-2">
              <GoogleSvg />
              Sign Up with Google
            </a>
          </Button>
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
