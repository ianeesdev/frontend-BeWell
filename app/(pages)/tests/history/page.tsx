"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "@/components/common/Navbar";
import axios from "axios";
import moment from "moment";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";

export default function Page() {
  const { user } = useSelector((state: any) => state.auth);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const response = await axios.get(
        "http://127.0.0.1:5002/auth/getTestsHistroy",
        config
      );

      const data = response.data;
      setHistory(data.testsHistory);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>

      <div className="w-[92%] mx-auto gap-5 mt-[3rem]">
        <div className="flex items-center gap-3">
          <Link href="/tests">
            <GoArrowLeft size={30} />
          </Link>
          <h1 className="text-3xl font-semibold">Tests History</h1>
        </div>

        <table className="mt-10 w-[80%] mx-auto table-auto border">
          <thead className="text-center font-bold text-[22px] bg-tertiary">
            <tr>
              <th className="border-2 p-4">Date</th>
              <th className="border-2 p-4">Test Name</th>
              <th className="border-2 p-4">Score</th>
              <th className="border-2 p-4">Prediction</th>
            </tr>
          </thead>
          <tbody className="text-center font-medium text-[18px]">
            {history?.map((test: any, index: number) => (
              <tr key={index}>
                <td className="border-2 p-4">
                  {moment(test.date).format("DD-MMM-YYYY hh:mmA")}
                </td>
                <td className="border-2 p-4">{test.testName}</td>
                <td className="border-2 p-4">{test.score}</td>
                <td className="border-2 p-4">{test.prediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
