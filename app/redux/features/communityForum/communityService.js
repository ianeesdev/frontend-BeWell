import axios from "axios";

const API_URL = "http://127.0.0.1:5003/community/";

// Add post
const addPost = async (data) => {
  const response = await axios.post(`${API_URL}createPost`, data);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("posts", JSON.stringify(response.data));
  }

  return response.data;
};

// Get all posts
const getPosts = async (userId) => {
  const response = await axios.get(`${API_URL}fetchPosts`);

  // const flaskResponse = await axios.get(
  //   `http://localhost:5011/recommendations?user_id=${userId}`
  // );

  // const dbPosts = response.data;
  // const recomPosts = flaskResponse.data;

  // let recommendedPosts = [];

  // if (dbPosts && recomPosts) {
  //   // Step 1: Get the ids from recomPosts
  //   const recomPostIds = recomPosts.map((post) => post._id);

  //   // Step 2 & 3: Search ids in dbPosts and append matching posts to recommendedPosts
  //   recomPostIds.forEach((id) => {
  //     const foundPost = dbPosts.find((post) => post._id === id);
  //     if (foundPost) {
  //       recommendedPosts.push(foundPost);
  //     }
  //   });

  //   // Step 4: Include posts from dbPosts that are not already present in recommendedPosts
  //   dbPosts.forEach((post) => {
  //     if (!recomPostIds.includes(post._id)) {
  //       recommendedPosts.push(post);
  //     }
  //   });

  //   localStorage.setItem("posts", JSON.stringify(recommendedPosts));
  //   return recommendedPosts;
  // } else {
  //   localStorage.setItem("posts", JSON.stringify(response.data));
  //   return response.data;
  // }
  if (global?.window !== 'undefined') {
    localStorage.setItem("posts", JSON.stringify(response.data));

  }
    return response.data;
};

const addCommentToPost = async (data) => {
  const response = await axios.post(
    `${API_URL}addCommentToPost/${data.postId}`,
    { commentText: data.commentText, userId: data.userId }
  );

  return response.data;
};

const deletePost = async (data) => {
  const response = await axios.delete(`${API_URL}deletePost/${data.postId}`);

  return response.data;
};

const communityService = {
  addPost,
  deletePost,
  getPosts,
  addCommentToPost,
};

export default communityService;
