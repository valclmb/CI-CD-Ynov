import "@testing-library/jest-dom";

import { renderWithQueryClient } from "@/lib/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";
import { UserForm } from "../components/UserForm/UserForm";

describe("UserForm Component", () => {
  let firstName: HTMLElement,
    lastName: HTMLElement,
    email: HTMLElement,
    birthDate: HTMLElement,
    city: HTMLElement,
    zipCode: HTMLElement,
    submit: HTMLElement;

  beforeEach(async () => {
    renderWithQueryClient(<UserForm close={() => {}} />);
    firstName = screen.getByTestId("firstName");
    lastName = screen.getByTestId("lastName");
    email = screen.getByTestId("email");
    birthDate = screen.getByTestId("birthDate");
    city = screen.getByTestId("city");
    zipCode = screen.getByTestId("zipCode");
    submit = screen.getByRole("button", { name: "Enregistrer" });

    await act(() => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(email, { target: { value: "Johndoe@email.com" } });
      fireEvent.change(birthDate, { target: { value: "2000-01-01" } });
      fireEvent.change(city, { target: { value: "Paris" } });
      fireEvent.change(zipCode, { target: { value: "75000" } });
    });
  });

  test("UserForm is rendered", () => {
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(birthDate).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(zipCode).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  test("Test success UserForm", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ message: "User created", success: true }),
      })
    );

    expect(submit).toBeEnabled();

    await act(async () => {
      fireEvent.submit(submit);
    });

    expect(screen.getByText("Utilisateur créé !")).toBeInTheDocument();
  });

  test("UserForm errors if invalid email", async () => {
    renderWithQueryClient(<UserForm close={() => {}} />);

    await act(() => {
      fireEvent.change(email, { target: { value: "Johndoeemail.com" } });
      fireEvent.submit(submit);
    });

    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  test("UserForm buttons become disabled if age is less than 18 ", async () => {
    renderWithQueryClient(<UserForm close={() => {}} />);

    await act(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 15);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
      const day = String(date.getDate()).padStart(2, "0");

      fireEvent.change(birthDate, {
        target: { value: `${year}-${month}-${day}` },
      });
      fireEvent.submit(submit);
    });

    expect(
      screen.getByText("Invalid birth date,you must have at least 18 years old")
    ).toBeInTheDocument();
  });

  test("UserForm buttons become disabled if zip code is invalid ", async () => {
    renderWithQueryClient(<UserForm close={() => {}} />);

    await act(() => {
      fireEvent.change(zipCode, { target: { value: "750000" } });
      fireEvent.submit(submit);
    });

    expect(
      screen.getByText("Invalid zip code format expected 5 digits")
    ).toBeInTheDocument();
  });
});

describe("UserForm Component empty", () => {
  test("UserForm buttons is disabled if empty", async () => {
    renderWithQueryClient(<UserForm close={() => {}} />);

    const submit = screen.getByRole("button", { name: "Enregistrer" });

    await act(async () => {
      fireEvent.click(submit);
    });
    expect(submit).toBeDisabled();
  });
});
