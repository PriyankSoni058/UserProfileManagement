import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import UserProfile from "../Components/UserProfile";
import userProfileReducer from "../lib/features/userProfile/userProfileSlice";
import { createUserProfile } from "../lib/features/userProfile/userProfileActions";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../lib/features/userProfile/userProfileActions", () => ({
  createUserProfile: jest.fn(),
}));

const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
  },
});

describe("UserProfile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders UserProfile component and submits form", async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "This is a bio" },
    });

    fireEvent.click(screen.getByText(/Add Profile/i));

    await waitFor(() => {
      expect(screen.getByText(/Adding.../i)).toBeInTheDocument();
    });
  });

  test("displays validation errors for invalid inputs", async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );

    // Submit the form without filling out any fields
    fireEvent.click(screen.getByText(/Add Profile/i));

    // Check for validation errors
    expect(
      await screen.findByText(/Username is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/First Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  test("calls API and redirects on successful form submission", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    createUserProfile.mockResolvedValue({
      userName: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      bio: "This is a bio",
      profile_image: "profile.jpg",
    });

    render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "This is a bio" },
    });

    fireEvent.click(screen.getByText(/Add Profile/i));

    await act(async () => {
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith("/");
      });
    });
  });

  test("handles API error and does not redirect", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    createUserProfile.mockRejectedValue(new Error("API call failed"));

    render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "This is a bio" },
    });

    fireEvent.click(screen.getByText(/Add Profile/i));

    await waitFor(() => {
      expect(navigate).not.toHaveBeenCalled();
      expect(screen.queryByText(/Adding.../i)).toBeNull();
    });
  });
});
