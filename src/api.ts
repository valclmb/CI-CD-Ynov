import { User } from "./components/UserForm/UserForm";

const API = process.env.VITE_API_URL;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API}/users`);
    return response.json();
  } catch (error) {
    console.log(error);
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
