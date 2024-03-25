import axios from "axios";

const API_URL = "http://127.0.0.1:5004/journals/";

// Add a journal
const addJournal = async (userData) => {
  const response = await axios.post(`${API_URL}add`, userData);

  if (response.data) {
    localStorage.setItem("journals", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Get All journals
const getAllJournalsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}get/${userId}`);

  if (response.data) {
    localStorage.setItem("journals", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Delete a journal
const deleteJournal = async (userId, journalId) => {
  const response = await axios.delete(`${API_URL}delete/${userId}/${journalId}`);

  if (response.data) {
    localStorage.setItem("journals", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

const resourceCenterService = {
  addJournal,
  getAllJournalsByUser,
  deleteJournal
};

export default resourceCenterService;
