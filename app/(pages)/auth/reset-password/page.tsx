"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

import { FaAngleLeft } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export default function Page() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user?.isUpdated) {
      router.push("/auth/login");
    }
  }, [isError, isSuccess, message, router, dispatch]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const data = {
        id: user?._id,
        token: user?.token,
        password,
      };
      dispatch(resetPassword(data));
    }
  };

  return (
    <div className="bg-lilacWhite w-full flex">
      <div className="bg-white h-screen flex flex-col justify-center w-1/2">
      <Image src="/logo.png" className="p-14 absolute top-0" width={230} height={230} alt="logo" />
        <div className="w-[50%] mx-auto flex flex-col gap-12">
          <div className="text-main flex flex-col gap-10">
            <Progress className="text-deepAqua" value={100} />
            <div className="space-y-5">
              <h2 className="text-4xl font-semibold flex gap-x-2 items-center -ms-2">
                <Link href={"/auth/verify-otp"}>
                  <FaAngleLeft size={35} />
                </Link>{" "}
                Reset Password
              </h2>
              <p className="text-lg">
                Set the new password for your account so you can login and
                access all the features.
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-9">
              <InputField
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Confirm New Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <Button type="submit">
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
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
