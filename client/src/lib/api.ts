import { BASE_API_URL } from "@/constants/appConstant";
import axios, { isAxiosError } from "axios";

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Automatically inject JWT token from localStorage into outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("syncdesk_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 Unauthorized, token is expired or invalid
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("syncdesk_token");
      localStorage.removeItem("syncdesk_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const errorMessageHandler = (message: string, error: unknown) => {
  let errorMessage = message;

  // Type-safe check for Axios errors
  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.error || errorMessage;
  } else if (error instanceof Error) {
    // Fallback for standard JavaScript errors (e.g., network/code errors)
    errorMessage = error.message;
  }

  return errorMessage;
};
