import axios from "axios";
const API = `http://localhost:8000`;
export const countUsers = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    return response.data.utilisateurs.length;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API}/users`);
    return response.data.utilisateurs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
