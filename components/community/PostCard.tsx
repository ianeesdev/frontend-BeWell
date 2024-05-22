import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSelector, useDispatch } from "react-redux";

import { BsThreeDots } from "react-icons/bs";
import CommentSvg from "../svgs/CommentSvg";
import { MdOutlineReport } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { deletePost } from "@/app/redux/features/communityForum/communitySlice";
import axios from "axios";

interface PostCardProps {
  personName: string;
  postId: string;
  authorId: string;
  postText: string;
  likes?: string;
  comments?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const PostCard: React.FC<PostCardProps> = ({
  personName,
  postId,
  authorId,
  postText,
  likes,
  comments,
  onClick,
  children,
}) => {
  const dispatch = useDispatch();

  const [showOptions, setShowOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const { user } = useSelector((state: any) => state.auth);

  const handleDelete = () => {
    const data = { postId: postId };
    dispatch(deletePost(data));
    window.location.reload();
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleReportSubmit = async () => {
    const payload = {
      reportedItem: postId,
      reporter: user?._id,
      description: reportDescription,
    };

    const response = await axios.post("http://localhost:5003/community/addReport", payload);

    setReportDescription("");
    setShowReportModal(false);
  };

  return (
    <div className="flex flex-col gap-2 pb-3 border-b-2 border-gray-200 p-4 relative">
      <div className="border-l-2 border-gray-200 ms-5 ps-8">
        <Avatar className="h-10 w-10 absolute left-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{personName}</h2>
            <div className="relative">
              <BsThreeDots
                size={25}
                className="cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              />
              {showOptions && (
                <div className="w-[12rem] absolute top-4 right-2 px-5 py-2.5 shadow-xl bg-white rounded-md z-50 flex flex-col justify-between gap-2">
                  <p
                    className="flex items-center justify-between gap-1.5 hover:bg-gray-300 px-3 py-1.5 rounded-md cursor-pointer"
                    onClick={handleReport}
                  >
                    <span className="text-[18px] font-medium">Report</span>
                    <MdOutlineReport size={25} />
                  </p>
                  {authorId === user?._id && (
                    <p
                      className="flex items-center justify-between gap-1.5 hover:bg-gray-300 px-3 py-1.5 rounded-md cursor-pointer"
                      onClick={handleDelete}
                    >
                      <span className="text-[18px] font-medium">Delete</span>
                      <MdOutlineDeleteForever
                        size={25}
                        className="text-red-600"
                      />
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="max-w-[95%]">{postText}</p>
          <div className="mt-3 flex gap-4 items-center">
            <CommentSvg onClick={onClick} />
          </div>
        </div>
      </div>
      <div className="ms-5 ps-8">
        <p className="text-faded">
          {likes} {comments} replies
        </p>
      </div>
      {children}
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed z-[600] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-[30rem] ">
            <h2 className="text-lg font-semibold mb-4">Report Post</h2>
            <textarea
              placeholder="Describe the issue..."
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              className="mt-2 p-2 w-full h-24 border rounded focus:outline-none focus:border-deepAqua"
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleReportSubmit}
                className="bg-deepAqua hover:bg-seaBlue text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
