import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import CommentSvg from "../svgs/CommentSvg";

interface PostCardProps {
  personName: string;
  postText: string;
  likes?: string;
  comments?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const PostCard: React.FC<PostCardProps> = ({
  personName,
  postText,
  likes,
  comments,
  onClick,
  children
}) => {
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
            <BsThreeDots size={30} />
          </div>
          <p className="max-w-[95%]">{postText}</p>
          <div className="mt-3 flex gap-4 items-center">
            <GoHeart size={22} />
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
    </div>
  );
};

export default PostCard;
