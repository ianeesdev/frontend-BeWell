"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import TestCard from "@/components/mHealthTests/TestCard";

export default function Page() {
  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex flex-col gap-10 mt-[3rem] relative">
        <h1 className="text-3xl font-semibold">Assessment Tests</h1>
        <div className="mt-5">
          <div className="flex justify-evenly">
            <TestCard
              testName="PHQ-9"
              abbreviation="Pateinet Health Questionnaire"
              link="tests/PHQ9"
            />

            <TestCard
              testName="GAD-7"
              abbreviation="Generalised Anxiety Disorder Assessment "
              link="tests/GAD7"
            />

            <TestCard
              testName="DASS-42"
              abbreviation="Depression Anxiety and Stress Scale"
              link="tests/DASS42"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
