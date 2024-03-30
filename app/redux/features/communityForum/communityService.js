import axios from "axios";

const API_URL = "http://127.0.0.1:5003/community/";

// Add post
const addPost = async (data) => {
  const response = await axios.post(`${API_URL}createPost`, data);

  if (response.data) {
    localStorage.setItem("posts", JSON.stringify(response.data));
  }

  return response.data;
};

const getPosts = async () => {
  const response = await axios.get(`${API_URL}fetchPosts`);

  if (response.data) {
    localStorage.setItem("posts", JSON.stringify(response.data));
  }

  return response.data;
};

const communityService = {
  addPost,
  getPosts
};

export default communityService;
