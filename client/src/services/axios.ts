import axios from "axios";
import { deleteCookie, getCookie } from "@/actions/cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = getCookie("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await handleLogout();
    }
    return Promise.reject(error);
  }
);

async function handleLogout() {
  try {
    await deleteCookie("accessToken");
    window.location.href = pageUrls.signIn;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export default axiosInstance;
