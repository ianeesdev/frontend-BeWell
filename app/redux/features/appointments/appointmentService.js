import axios from "axios";

const API_URL = "http://127.0.0.1:5001/appointments/";

// Add appointment
const addAppointment = async (userData) => {
  const response = await axios.post(`${API_URL}add/${userData.userId}`, {
    therapistId: userData?.therapistId,
    dateTime: userData?.dateTime,
  });

  if (response.data) {
    localStorage.setItem("appointments", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Get appointments
const getAppointments = async (userId) => {
  const response = await axios.get(`${API_URL}${userId}`);

  if (response.data) {
    localStorage.setItem("appointments", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

const appointmentService = {
  addAppointment,
  getAppointments,
};

export default appointmentService;
