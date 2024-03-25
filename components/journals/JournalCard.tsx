import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { deleteJournal } from "../../app/redux/features/resource-center/resourceCenterSlice";

interface JournalCardProps {
  journalId: string;
  title: string;
  text: string;
  dateAdded: string;
}

const JournalCard: React.FC<JournalCardProps> = ({
  journalId,
  title,
  text,
  dateAdded,
}) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteJournal(journalId));
  }

  return (
    <div className="bg-white p-6 drop-shadow-lg rounded-xl flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PiNotepadFill size={30} />
          <p className="text-xl font-medium">{title}</p>
        </div>
        <div className="flex gap-2 items-center">
          <MdDeleteOutline className="text-red-600 cursor-pointer" size={30} onClick={onDelete} />
        </div>
      </div>
      <div>
        <p className="text-md">{text} </p>
      </div>
      <div>
        <p className="text-faded">Created on {dateAdded}</p>
      </div>
    </div>
  );
};

export default JournalCard;
