import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "../components/Counter";

test("check counter", () => {
  render(<Counter />);

  const button = screen.getByRole("button");
  const counter = screen.getByTestId("count");
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});
