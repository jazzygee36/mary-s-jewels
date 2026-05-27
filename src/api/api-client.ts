import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token"); // Or whatever your key name is
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses straight through
  (error) => {
    // Check if the server explicitly rejected the request due to unauthorized/expired credentials
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("auth_token");

      const currentPath = window.location.pathname + window.location.search;

      // Avoid infinite redirect loops if they are already on the login page
      if (!window.location.pathname.includes("/login")) {
        // Kick them to login, appending the current path so we can return them later
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`;
      }
    }

    // Pass the error down to components (like React Query) if they need to show local alerts
    return Promise.reject(error);
  },
);
