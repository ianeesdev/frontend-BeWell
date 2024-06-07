import axios from "axios";
import { setLocalStorageItem, removeLocalStorageItems } from '../../../../lib/utils.ts';

const API_URL = "http://127.0.0.1:5000/auth/";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    setLocalStorageItem("user", JSON.stringify(response.data));
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

  if (response.data) {
    setLocalStorageItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Forgot password
const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}forgot-password`, email);

  if (response.data) {
    setLocalStorageItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Reset password
const resetPassword = async (data) => {
  const response = await axios.post(API_URL + `resetPassword`, data);

  if (response.data) {
    setLocalStorageItem("user", JSON.stringify(response.data));
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

  if (response.data) {
    setLocalStorageItem("user", JSON.stringify(response.data));
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
  if (typeof window !== 'undefined') {
    removeLocalStorageItems([
      "user",
      "appointments",
      "chats",
      "messages",
      "activeChat",
      "posts",
      "journals",
      "therapists"
    ]);
  }
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
