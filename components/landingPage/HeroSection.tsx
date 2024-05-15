"use client";

import Image from "next/image";
import Header from "./Header";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../common/Button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-heroBg h-screen bg-no-repeat w-full bg-cover overflow-hidden">
      <Header />
      <div className="w-[85%] mx-auto h-full flex justify-between items-center">
        <div className="w-full flex items-start">

        <div className="w-[30%] space-y-10">
          <h1 className="font-bold text-[62px] leading-tight">
            Empathetic Mental Health App:
            <span className="text-deepAqua"> Be Well</span>
          </h1>
          <p className="text-grey text-lg leading-tight">
            Empowering you with assessments, appointments, support, and
            resources - all in one place
          </p>

          <Button>
            <Link href={"/auth/register"} className="flex items-center gap-8">
              <p>Sign up Now</p>
              <span className="bg-white rounded-full p-2">
                <FaArrowRightLong size={15} className="text-deepAqua" />
              </span>
            </Link>
          </Button>
        </div>

        <div className="w-[50%] ms-auto">
          <Image
            src="/hero-section-pic.png"
            width={850}
            height={850}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
