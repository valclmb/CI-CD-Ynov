import { createUser, getAllUsers } from "./api";

// Mock the global fetch function
global.fetch = jest.fn();

describe("getAllUsers", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

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
  afterEach(() => {
    jest.resetAllMocks();
  });
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    birthDate: "1990-01-01",
    city: "Paris",
    zipCode: "75000",
  };
  it("should make a POST request with the correct parameters and return the response data", async () => {
    // Mock de la réponse de fetch

    const mockResponse = { id: 1, firstName: "John", lastName: "Doe" };
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

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

  it("should throw an error if fetch fails", async () => {
    // Mock pour simuler une erreur
    (fetch as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    await expect(createUser(user)).rejects.toThrow("Fetch failed");
  });
});