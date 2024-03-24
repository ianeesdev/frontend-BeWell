"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import NotificationCard from "@/components/community/NotificationCard";
import GroupCard from "@/components/community/GroupCard";
import CommentSvg from "@/components/svgs/CommentSvg";

import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";

export default function Page() {
  const [postText, setPostText] = useState("");

  return (
    <div className="overflow-hidden h-screen">
      <div className="p-3">
        <Navbar />
      </div>
      <div className="mt-[2rem]">
        <div className="flex justify-between">
          <div className="w-[25%] border-b-2 border-gray-200 pb-5">
            <div className="text-center">
              <p className="text-xl font-medium">Community Forum</p>
            </div>
          </div>
          <div className="w-[50%] flex justify-center border-b-2 border-r-2 border-l-2 border-gray-200 pb-5">
            <div className="flex gap-10 items-center justify-between">
              <GoHomeFill size={26} className="text-deepAqua cursor-pointer" />
              <FiSearch size={26} className="text-faded cursor-pointer" />
            </div>
          </div>
          <div className="w-[25%] border-b-2 border-gray-200 pb-5">
            <p className="text-xl font-medium text-center">Activity</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-[25%]">
            <div className="p-10 flex flex-col gap-6">
              <div className="flex flex-col gap-3 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-2xl">Muhammad Anees</p>
                    <p className="text-faded text-lg">aneese421@gmail.com</p>
                  </div>
                </div>
                <p className="text-lg">
                  Joined groups:{" "}
                  <span className="text-deepAqua font-semibold">4</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Groups</p>
                <div className="flex flex-col gap-2">
                  <GroupCard groupName="Depression" />
                  <GroupCard groupName="Anxiety" />
                  <GroupCard groupName="General Discussion" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="border-r-2 border-l-2 border-gray-200">
              <div className="p-4 border-b-2 border-gray-200">
                <div className="flex gap-2">
                  <Avatar className="h-10 w-10 mt-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Share your thoughts"
                      className="border-0 shadow-none rounded-none px-[2px]"
                      isTextArea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex justify-end items-center gap-4">
                      <div className="flex gap-1 items-center">
                        <Checkbox className="data-[state=checked]:bg-deepAqua" />
                        <p>Post Anonymously</p>
                      </div>
                      <Button className="rounded-xl">Post</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto h-[40rem] pb-[8rem]">
                <div className="flex flex-col gap-2 pb-3 border-b-2 border-gray-200 p-4 relative">
                  <div className="border-l-2 border-gray-200 ms-5 ps-8">
                    <Avatar className="h-10 w-10 absolute left-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Muneeb</h2>
                        <BsThreeDots size={30} />
                      </div>
                      <p className="max-w-[95%]">
                        It took so long for this desktop version of Threads to
                        come out, but I'm really excited to start posting tips
                        and content directly from the computer
                      </p>
                      <div className="mt-3 flex gap-4 items-center">
                        <GoHeart size={22} />
                        <CommentSvg />
                      </div>
                    </div>
                  </div>
                  <div className="ms-5 ps-8">
                    <p className="text-faded">30 likes . 10 replies</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-3 border-b-2 border-gray-200 p-4 relative">
                  <div className="border-l-2 border-gray-200 ms-5 ps-8">
                    <Avatar className="h-10 w-10 absolute left-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Usman</h2>
                        <BsThreeDots size={30} />
                      </div>
                      <p className="max-w-[95%]">
                        guys, just see that now we have a "Save for Later" I've
                        been waiting for this so much
                      </p>
                      <div className="mt-3 flex gap-4 items-center">
                        <GoHeart size={22} />
                        <CommentSvg />
                      </div>
                    </div>
                  </div>
                  <div className="ms-5 ps-8">
                    <p className="text-faded">10 likes . 3 replies</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-3 border-b-2 border-gray-200 p-4 relative">
                  <div className="border-l-2 border-gray-200 ms-5 ps-8">
                    <Avatar className="h-10 w-10 absolute left-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Fahad</h2>
                        <BsThreeDots size={30} />
                      </div>
                      <p className="max-w-[95%]">
                        I’ve been exploring ways of setting up variables in
                        Figma if you have two different sets of global colours
                        for light and dark themes with multiple brands. If you
                        want to learn more about it, DM me, please
                      </p>
                      <div className="mt-3 flex gap-4 items-center">
                        <GoHeart size={22} />
                        <CommentSvg />
                      </div>
                    </div>
                  </div>
                  <div className="ms-5 ps-8">
                    <p className="text-faded">5 likes . 2 replies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[25%]">
            <div className="p-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-faded text-lg">Latest</p>
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-faded text-lg">Older</p>
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
