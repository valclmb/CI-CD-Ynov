import { User } from "./components/UserForm/UserForm";

const port = import.meta.env.VITE_API_PORT;
const API = `http://localhost:${port}`;
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API}/users`);
    return response.json();
  } catch (error) {
    console.error("Error fetching users");
    throw error;
  }
};

export const createUser = (user: User) => {
  try {
    return fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error creating user");
    throw error;
  }
};
