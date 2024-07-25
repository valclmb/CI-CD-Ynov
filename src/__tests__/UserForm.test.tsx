import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { UserForm } from "../components/UserForm/UserForm";

test("Test success Login Form", () => {
  render(<UserForm close={() => {}} />);
  const firstName = screen.getByTestId("firstName");
  const lastName = screen.getByTestId("lastName");
  const email = screen.getByTestId("email");
  const birthDate = screen.getByTestId("birthDate");
  const city = screen.getByTestId("city");
  const zipCode = screen.getByTestId("zipCode");
  const submit = screen.getByRole("button");

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(birthDate).toBeInTheDocument();
  expect(city).toBeInTheDocument();
  expect(zipCode).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

  fireEvent.change(firstName, { target: { value: "John" } });
  fireEvent.change(lastName, { target: { value: "Doe" } });
  fireEvent.change(email, { target: { value: "JohDoe@email.com" } });
  fireEvent.change(birthDate, { target: { value: "2000-01-01" } });
  fireEvent.change(city, { target: { value: "Paris" } });
  fireEvent.change(zipCode, { target: { value: "75000" } });

  fireEvent.click(submit);
});
