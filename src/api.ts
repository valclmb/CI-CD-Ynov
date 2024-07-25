import { User } from "./components/UserForm/UserForm";

const API = process.env.VITE_API_URL;

/**
 * Fetches all users from the API.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 * @throws {Error} If there is an error during the API request.
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API}/users`);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Creates a new user.
 * @param {User} user - The user object to be created.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 * @throws {Error} If there is an error during the API request.
 */
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
