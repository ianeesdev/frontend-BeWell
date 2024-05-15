import Button from "@/components/common/Button";
import FeaturesSection from "@/components/landingPage/FeaturesSection";
import HeroSection from "@/components/landingPage/HeroSection";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />

      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[50%] mx-auto bg-white shadow-xl rounded-lg p-10 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-seaBlue text-[54px] font-bold text-center">
            Start Your Journey to Better Mental Health Today
          </h2>

          <Button variant="secondary"><Link href={"/auth/register"}>Sign Up</Link></Button>
        </div>
      </div>

      <footer className="w-[80%] mx-auto p-6 flex justify-between items-center">
        <p className="text-lg text-deepAqua italic">Be-Well @ 2024</p>
        <div className="flex items-center gap-4">
          <div className="shadow-lg rounded-full p-4">
            <FaFacebookF size={25} />
          </div>

          <div className="shadow-lg rounded-full p-4">
            <FaInstagram size={25} />
          </div>

          <div className="shadow-lg rounded-full p-4">
            <FaLinkedinIn size={25} />
          </div>
        </div>
      </footer>
    </div>
  );
}
