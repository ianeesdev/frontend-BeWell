import axios from "axios";

const API_URL = "http://127.0.0.1:5000/auth/";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login with google
const googleAuth = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}getUser`, config);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// forgot passowrd
const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}forgot-password`, email);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// reset passowrd
const resetPassword = async (data) => {
  const response = await axios.post(API_URL + `resetPassword`, data);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Onboarding question
const saveOnboardingResponses = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `onboardingResponses`,
    data,
    config
  );

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Save user assessment test results
const addTestResult = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + `addTestResult`, data, config);

  return response.data;
};

// Save user assessment test results
const addAnalysisResult = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + `addAnalysisResult`, data, config);

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.clear();
  localStorage.removeItem("user");
  localStorage.removeItem("appointments");
  localStorage.removeItem("chats");
  localStorage.removeItem("messages");
  localStorage.removeItem("activeChat");
  localStorage.removeItem("posts");
  localStorage.removeItem("journals");
  localStorage.removeItem("therapists");
};

const authService = {
  register,
  logout,
  forgotPassword,
  resetPassword,
  login,
  googleAuth,
  saveOnboardingResponses,
  addTestResult,
  addAnalysisResult
};

export default authService;
