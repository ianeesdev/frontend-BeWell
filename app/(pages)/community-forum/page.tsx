"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import NotificationCard from "@/components/community/NotificationCard";
import GroupCard from "@/components/community/GroupCard";
import PostCard from "@/components/community/PostCard";

import { GoArrowLeft, GoHomeFill } from "react-icons/go";

import { HiOutlineLogout } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  addPost,
  getPosts,
} from "../../redux/features/communityForum/communitySlice";
import { googleAuth } from "../../redux/features/auth/authSlice";
import axios from "axios";

const API_URL = "http://127.0.0.1:5003/community/";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { posts, isError, message } = useSelector(
    (state: any) => state.communityForum
  );

  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [currentSelectedPost, setCurrentSelectedPost] = useState(null);

  const [groupsData, setGroupsData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupPosts, setGroupPosts] = useState([]);

  const handleAddPost = async () => {
    const payload = {
      isAnonymous: isAnonymous,
      text: postText,
      author: user?._id,
      ...(selectedGroup && { groupId: selectedGroup._id })
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
  }, [user, posts, isError, message, dispatch]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCommentBtnClick = async (postID: any) => {
    setSelectedPostId(postID);
    const response = await axios.get(`${API_URL}fetchPost/${postID}`);
    setCurrentSelectedPost(response.data);
    setAddComment(true);
  };

  const addPostComment = async (postId: any) => {
    const response = await axios.post(`${API_URL}addCommentToPost/${postId}`, {
      commentText,
      userId: user?._id,
    });

    setCommentText("");
    setIsAnonymous(false);
    setCurrentSelectedPost(response.data);
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}fetchGroups`);
      setGroupsData(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const addMemberToGroup = async () => {
    const response = await axios.post(`${API_URL}addGroupMember`, {
      groupId: selectedGroup?._id,
      memberId: user?._id,
    });
    dispatch(googleAuth(user?.token));
    setGroupsData(response.data);
  };

  const removeMemberFromGroup = async () => {
    const response = await axios.post(`${API_URL}removeUser`, {
      userId: user?._id,
      groupId: selectedGroup?._id,
    });
    dispatch(googleAuth(user?.token));
    setGroupsData(response.data);
  }

  const handleGroupItemClick = async (group: any) => {
    setSelectedGroup(group);
    const response = await axios.get(`${API_URL}fetchGroupPosts/${group?._id}`);
    setGroupPosts(response.data.posts);
  };

  const addGroupPost = async () => {
    handleAddPost();
    setTimeout(async () => {
      const response = await axios.get(
        `${API_URL}fetchGroupPosts/${selectedGroup?._id}`
      );
      setGroupPosts(response.data.posts);
    }, 2000);
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
              <GoHomeFill size={26} className="text-deepAqua cursor-pointer" onClick={() => setSelectedGroup(null)} />
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
                    <p className="font-bold text-2xl">{user?.name}</p>
                    <p className="text-faded text-lg">{user?.email}</p>
                  </div>
                </div>
                <p className="text-lg">
                  Joined groups:{" "}
                  <span className="text-deepAqua font-semibold">
                    {user?.groups}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Groups</p>
                <div className="flex flex-col gap-2">
                  {groupsData?.map((group, index) => (
                    <GroupCard
                      key={index}
                      groupName={group?.name}
                      className={`${
                        selectedGroup?._id === group?._id &&
                        "bg-deepAqua text-white hover:bg-deepAqua"
                      }`}
                      onClick={() => handleGroupItemClick(group)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%]">
            {selectedGroup && (
              <div className="flex justify-between items-center bg-gray-100 px-6 py-4 h-[80px]">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-[18px] font-medium">
                    {selectedGroup?.name}
                  </p>
                </div>
                {selectedGroup?.members.includes(user?._id) ? (
                  <HiOutlineLogout size={25} className="cursor-pointer" onClick={removeMemberFromGroup} />
                ) : (
                  <Button className="rounded-xl" onClick={addMemberToGroup}>
                    Join
                  </Button>
                )}
              </div>
            )}

            <div
              className={`overflow-y-auto ${
                selectedGroup ? "h-[40rem]" : "h-[45rem]"
              }`}
            >
              <div className="border-r-2 border-l-2 border-gray-200">
                {/* GROUP HOME */}
                {selectedGroup ? (
                  <div>
                    {selectedGroup?.members.includes(user?._id) && (
                      <div className="px-7 py-4 border-b-2 border-gray-200">
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
                                  onCheckedChange={() =>
                                    setIsAnonymous(!isAnonymous)
                                  }
                                />
                                <p>Post Anonymously</p>
                              </div>
                              <Button
                                className="rounded-xl"
                                onClick={addGroupPost}
                              >
                                Post
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      {groupPosts.map((post: any, index: number) => (
                        <PostCard
                          key={index}
                          personName={
                            post?.isAnonymous
                              ? "Anonymous"
                              : post?.author?.username
                          }
                          postId={post?._id}
                          authorId={post?.author?._id}
                          postText={post?.text}
                          comments={post?.comment.length}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* POSTS */}
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
                                onCheckedChange={() =>
                                  setIsAnonymous(!isAnonymous)
                                }
                              />
                              <p>Post Anonymously</p>
                            </div>
                            <Button
                              className="rounded-xl"
                              onClick={handleAddPost}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pb-[8rem]">
                      {addComment ? (
                        <div className="flex gap-2">
                          <div className="pt-6 ps-3 w-[3%]">
                            <GoArrowLeft
                              size={28}
                              className="cursor-pointer"
                              onClick={() => {
                                setAddComment(!addComment);
                                dispatch(getPosts());
                              }}
                            />
                          </div>
                          <div className="w-[97%]">
                            <PostCard
                              personName={
                                currentSelectedPost?.isAnonymous
                                  ? "Anonymous"
                                  : currentSelectedPost?.author?.username
                              }
                              postId={currentSelectedPost?._id}
                              authorId={currentSelectedPost?.author?._id}
                              postText={currentSelectedPost?.text}
                              comments={currentSelectedPost?.comment.length}
                            >
                              <div className="py-3 px-6 flex items-center gap-3">
                                <InputField
                                  type="text"
                                  placeholder="Comment..."
                                  className="border-0 shadow-none rounded-none px-2"
                                  isTextArea
                                  rows={1}
                                  value={commentText}
                                  onChange={(e) =>
                                    setCommentText(e.target.value)
                                  }
                                />

                                <Button
                                  className="rounded-xl"
                                  onClick={() => addPostComment(selectedPostId)}
                                >
                                  Reply
                                </Button>
                              </div>

                              {currentSelectedPost?.comment.length > 0 &&
                                currentSelectedPost.comment.map(
                                  (comment: any, index: number) => (
                                    <PostCard
                                      key={index}
                                      personName={
                                        comment?.isAnonymous
                                          ? "Anonymous"
                                          : comment?.author?.username
                                      }
                                      postId={comment?._id}
                                      authorId={comment?.author?._id}
                                      postText={comment?.text}
                                      comments={comment?.comment.length}
                                      onClick={() =>
                                        handleCommentBtnClick(comment?._id)
                                      }
                                    >
                                      {selectedPostId === comment?._id && (
                                        <div className="py-3 px-6 flex items-center gap-3">
                                          <InputField
                                            type="text"
                                            placeholder="Comment..."
                                            className="border-0 shadow-none rounded-none px-2"
                                            isTextArea
                                            rows={1}
                                            value={commentText}
                                            onChange={(e) =>
                                              setCommentText(e.target.value)
                                            }
                                          />

                                          <Button
                                            className="rounded-xl"
                                            onClick={() =>
                                              addPostComment(
                                                posts[selectedPostId]?._id
                                              )
                                            }
                                          >
                                            Reply
                                          </Button>
                                        </div>
                                      )}
                                    </PostCard>
                                  )
                                )}
                            </PostCard>
                          </div>
                        </div>
                      ) : (
                        posts &&
                        posts?.map((post: any, index: any) => (
                          <PostCard
                            key={index}
                            personName={
                              post?.isAnonymous
                                ? "Anonymous"
                                : post?.author?.username
                            }
                            postId={post?._id}
                            authorId={post?.author?._id}
                            postText={post?.text}
                            onClick={() => handleCommentBtnClick(post?._id)}
                            comments={post?.comment.length}
                          />
                        ))
                      )}
                    </div>
                  </>
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
