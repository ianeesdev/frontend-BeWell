import axios from "axios";

const API_URL = "http://127.0.0.1:5005/therapist/";

// Get All therapists
const getAllTherapists = async () => {
  const response = await axios.get(`${API_URL}all`);

  if (response.data && global?.window !== 'undefined') {
    localStorage.setItem("therapists", JSON.stringify(response.data));
  }

  return response.data;
};

const therapistService = {
  getAllTherapists,
};

export default therapistService;
