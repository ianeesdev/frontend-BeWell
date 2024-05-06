"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import NotificationCard from "@/components/community/NotificationCard";
import GroupCard from "@/components/community/GroupCard";

import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addPost,
  getPosts,
  addCommentToPost,
} from "../../redux/features/communityForum/communitySlice";
import PostCard from "@/components/community/PostCard";

export default function Page() {
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(-1);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.communityForum
  );

  const handleAddPost = () => {
    const payload = {
      isAnonymous: isAnonymous,
      text: postText,
      author: user?._id,
    };

    dispatch(addPost(payload));
    setPostText("");
    setIsAnonymous(false);
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (user?.isLoggedIn) {
      dispatch(getPosts());
    } else router.push("/auth/login");
  }, [user, isError, message, dispatch]);

  const handleCommentBtnClick = (postIndex: number) => {
    setAddComment(!addComment);
    setSelectedPostIndex(postIndex);
  };

  const addCommentToPost = (postId: any) => {
    dispatch(
      addCommentToPost({
        postId: postId,
        commentText: commentText,
        userId: user?._id,
      })
    );
  };

  return (
    <div className="overflow-hidden h-screen">
      <div className="p-3">
        <Navbar />
      </div>
      <div className="mt-[2rem]">
        <div className="flex justify-between">
          <div className="w-[25%] border-b-2 border-gray-200 pb-5">
            <div className="text-center">
              <p className="text-xl font-medium">Community Forum</p>
            </div>
          </div>
          <div className="w-[50%] flex justify-center border-b-2 border-r-2 border-l-2 border-gray-200 pb-5">
            <div className="flex gap-10 items-center justify-between">
              <GoHomeFill size={26} className="text-deepAqua cursor-pointer" />
              <FiSearch size={26} className="text-faded cursor-pointer" />
            </div>
          </div>
          <div className="w-[25%] border-b-2 border-gray-200 pb-5">
            <p className="text-xl font-medium text-center">Activity</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-[25%]">
            <div className="p-10 flex flex-col gap-6">
              <div className="flex flex-col gap-3 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-2xl">Muhammad Anees</p>
                    <p className="text-faded text-lg">aneese421@gmail.com</p>
                  </div>
                </div>
                <p className="text-lg">
                  Joined groups:{" "}
                  <span className="text-deepAqua font-semibold">4</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Groups</p>
                <div className="flex flex-col gap-2">
                  <GroupCard groupName="Depression" />
                  <GroupCard groupName="Anxiety" />
                  <GroupCard groupName="General Discussion" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="border-r-2 border-l-2 border-gray-200">
              <div className="p-4 border-b-2 border-gray-200">
                <div className="flex gap-2">
                  <Avatar className="h-10 w-10 mt-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Share your thoughts"
                      className="border-0 shadow-none rounded-none px-[2px]"
                      isTextArea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex justify-end items-center gap-4">
                      <div className="flex gap-1 items-center">
                        <Checkbox
                          className="data-[state=checked]:bg-deepAqua"
                          checked={isAnonymous}
                          onCheckedChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        <p>Post Anonymously</p>
                      </div>
                      <Button className="rounded-xl" onClick={handleAddPost}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto h-[40rem] pb-[8rem]">
                {addComment ? (
                  <>
                    <PostCard
                      personName={
                        posts[selectedPostIndex]?.isAnonymous
                          ? "Anonymous"
                          : posts[selectedPostIndex]?.author.username
                      }
                      postText={posts[selectedPostIndex]?.text}
                      likes="30"
                      comments="10"
                    >
                      <div className="py-3 px-6 flex items-center gap-3">
                        <InputField
                          type="text"
                          placeholder="Comment..."
                          className="border-0 shadow-none rounded-none px-2"
                          isTextArea
                          rows={1}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />

                        <Button
                          className="rounded-xl"
                          onClick={() => addCommentToPost(posts[selectedPostIndex]?._id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </PostCard>
                  </>
                ) : (
                  posts &&
                  posts?.map((post: any, index: any) => (
                    <PostCard
                      key={index}
                      personName={
                        post.isAnonymous ? "Anonymous" : post?.author?.username
                      }
                      postText={post.text}
                      onClick={() => handleCommentBtnClick(index)}
                      likes="30"
                      comments="10"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="w-[25%]">
            <div className="p-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-faded text-lg">Latest</p>
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-faded text-lg">Older</p>
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                  <NotificationCard personName="Fahad" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
