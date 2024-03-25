"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import JournalCard from "@/components/journals/JournalCard";
import AddJournal from "@/components/journals/AddJournal";

import { IoMdAddCircle } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllJournalsByUser } from "../../redux/features/resource-center/resourceCenterSlice";

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { journals, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.resourceCenter
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(getAllJournalsByUser(user?._id));
    } else router.push("/auth/login");

  }, [user, journals, router, dispatch]);

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex gap-5 mt-[3rem] relative">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold">Journals</h1>
            <IoMdAddCircle
              size={50}
              className="text-deepAqua cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>
          <div className="mt-5 w-full">
            <div className="grid grid-cols-3 gap-5">
              {journals?.map((journal: any, index: any) => (
                <JournalCard
                  key={index}
                  journalId={journal?._id}
                  title={journal?.title}
                  text={journal?.text}
                  dateAdded={journal?.createdAt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && <AddJournal onClose={toggleDrawer} />}
    </div>
  );
}
