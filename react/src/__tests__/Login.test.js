import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
const React = require("react");
const userEvent = require("@testing-library/user-event");
require("@testing-library/jest-dom/extend-expect");

describe("Login Page", () => {
  test("Make sure all fields are empty when opening the page", () => {
    const { getByTestId } = render(<Login />);
    const field = getByTestId("field");
    expect(field.textContent).toBe(null);
  });

  test("Check if 'LOG IN' button is clickable", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    userEvent.click(screen.getByText("/menu/"));
    expect(screen.getByText("/menu")).toBeInTheDocument();
  });

  test("Check if 'NOT A USER?' button is clickable", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    userEvent.click(screen.getByText("/signup/"));
    expect(screen.getByText("/signup")).toBeInTheDocument();
  });
});
