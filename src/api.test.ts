import { createUser, getAllUsers } from "./api";

// Mock the global fetch function
global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("getAllUsers", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@email.com",
        },
      ],
    };

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      })
    );

    await expect(getAllUsers()).resolves.toEqual(data);
    expect(fetch).toHaveBeenCalledWith(`${process.env.VITE_API_URL}/users`);
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getAllUsers()).rejects.toThrow(errorMessage);
  });
});

// Mock pour la fonction fetch globale
global.fetch = jest.fn();

describe("createUser", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    birthDate: "1990-01-01",
    city: "Paris",
    zipCode: "75000",
  };

  it("make a POST request with the correct parameters and return the response data", async () => {
    const mockResponse = { id: 1, firstName: "John", lastName: "Doe" };

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await createUser(user);

    expect(fetch).toHaveBeenCalledWith(`${process.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    expect(result).toEqual(mockResponse);
  });

  it("throw an error if fetch fails", async () => {
    const errorMessage = "Network Error";

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(createUser(user)).rejects.toThrow(errorMessage);
  });
});
