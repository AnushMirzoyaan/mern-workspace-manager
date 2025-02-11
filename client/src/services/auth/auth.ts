"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import axiosInstance from "../axios";

const setTokens = ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: any;
}) => {
  if (!accessToken || !user) {
    console.error("Invalid authentication response");
    return;
  }

  setCookie("accessToken", accessToken, {
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("userId", user._id);

  window.location.replace("/workspace-manager");
};

export const getAuthToken = () => {
  return getCookie("accessToken");
};

export const removeAuthToken = () => {
  deleteCookie("accessToken");
};

export const signIn = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/auth/signin", payload);

    setTokens(response.data);
    return true;
  } catch (error: any) {
    console.error("Sign-in error:", error);
    toast.error(
      error.response?.data?.message || "An error occurred during sign-in"
    );
    return false;
  }
};

export const signUp = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/auth/signup", payload);
    return response.data;
  } catch (error: any) {
    console.error("Sign-up error:", error);
    const errorMessage =
      error.response?.data?.message || "An error occurred during sign-up";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
