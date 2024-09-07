import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  if (error.response) {
    toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
  } else if (error.request) {
    toast.error("Error: No response from server.");
  } else {
    toast.error(`Error: ${error.message || "An error occurred"}`);
  }
};

export const getAllUserProfilesAPI = async () => {
  try {
    const response = await axiosInstance.get("/user/profiles");
    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateUserProfileAPI = async (formData, id) => {
  try {
    const response = await axiosInstance.put(`/user/profile/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message || "Profile updated successfully.");
    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const createUserProfileAPI = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message || "Profile created successfully.");
    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
