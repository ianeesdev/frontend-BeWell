"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import JournalCard from "@/components/journals/JournalCard";
import AddJournal from "@/components/journals/AddJournal";

import { IoMdAddCircle } from "react-icons/io";

export default function Page() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex gap-5 mt-[3rem] relative">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold">Journals</h1>
            <IoMdAddCircle size={50} className="text-deepAqua cursor-pointer" onClick={toggleDrawer} />
          </div>
          <div className="mt-5 w-full">
            <div className="grid grid-cols-3 gap-5">
              <JournalCard
                title="Thoughts"
                text="Lorem ispum Lorem ispumLorem ispumLorem  fsd fds ispumLorem ispumLorem ispumLorem ispum Loremc uLorem ispufd ff."
                dateAdded="22/09/2022"
              />

              <JournalCard
                title="Thoughts"
                text="Lorem ispum Lorem ispumLorem ispumLorem  fsd fds ispumLorem ispumLorem ispumLorem ispum Loremc uLorem ispufd ff."
                dateAdded="22/09/2022"
              />

              <JournalCard
                title="Thoughts"
                text="Lorem ispum Lorem ispumLorem ispumLorem  fsd fds ispumLorem ispumLorem ispumLorem ispum Loremc uLorem ispufd ff."
                dateAdded="22/09/2022"
              />

              <JournalCard
                title="Thoughts"
                text="Lorem ispum Lorem ispumLorem ispumLorem  fsd fds ispumLorem ispumLorem ispumLorem ispum Loremc uLorem ispufd ff."
                dateAdded="22/09/2022"
              />

              <JournalCard
                title="Thoughts"
                text="Lorem ispum Lorem ispumLorem ispumLorem  fsd fds ispumLorem ispumLorem ispumLorem ispum Loremc uLorem ispufd ff."
                dateAdded="22/09/2022"
              />
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && <AddJournal onClose={toggleDrawer} />}
    </div>
  );
}
