import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Calendar } from "@/components/ui/calendar";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface AddJournalProps {
  onClose: () => void;
}

const AddJournal: React.FC<AddJournalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [journalText, setJournalText] = useState("");

  return (
    <div className="relative">
      <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[30%] p-8 shadow-sm bg-white rounded-lg">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center pb-6 border-b-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-center">
              Add a Journal
            </h2>
            <div className="rounded-full drop-shadow-md p-1 bg-white">
              <RxCross2 size={25} className="cursor-pointer" onClick={onClose} />
            </div>
          </div>

          <form className="flex flex-col gap-3">
            <InputField
              type="text"
              placeholder="Title"
              value={title}
              className="rounded-xl"
              onChange={(e) => setTitle(e.target.value)}
            />

            <InputField
              type="text"
              placeholder="Journal Text"
              value={journalText}
              isTextArea
              rows={10}
              className="rounded-xl"
              onChange={(e) => setJournalText(e.target.value)}
            />

            <div className="flex justify-between mt-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJournal;
