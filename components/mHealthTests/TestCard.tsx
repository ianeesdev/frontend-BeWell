import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface TestCardProps {
  testName: string;
  abbreviation: string;
  link: string;
}

const TestCard: React.FC<TestCardProps> = ({
  testName,
  abbreviation,
  link,
}) => {
  return (
    <div className="bg-white px-14 py-10 drop-shadow-lg rounded-xl flex flex-col justify-center items-center gap-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold">{testName}</h1>
        <p className="text-xl text-faded max-w-[60%] mx-auto text-center">
          {abbreviation}
        </p>
      </div>
      <Link href={link}>
        <span className="flex gap-2 items-center text-deepAqua text-2xl font-semibold">
          Take Test <FaArrowRightLong />
        </span>
      </Link>
    </div>
  );
};

export default TestCard;
