"use client";

import axiosInstance from "../axios";

export const getWorkspaces = async (userId: string) => {
  return await axiosInstance.get(`/workspaces`, {
    params: { userId },
  });
};

export const createWorkspace = async (
  userId: string,
  name: string,
  slug: string
) => {
  try {
    const response = await axiosInstance.post(`/workspaces`, {
      name,
      slug,
      userId,
    });

    if (response.data.workspaceCreated) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: "Workspace creation failed" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
    };
  }
};

export const checkSlugAvailability = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/workspaces/slug/${slug}`);

    if (response.data.available) {
      return { available: true, suggestions: [] };
    } else {
      return { available: false, suggestions: response.data.suggestions };
    }
  } catch (error: any) {
    console.error(error);
    return {
      available: false,
      suggestions: [],
      message: error.response?.data?.message || "Error checking slug",
    };
  }
};

export const updateWorkspace = async (id: string, workspaceData: any) => {
  try {
    const response = await axiosInstance.put(
      `/workspaces/${id}`,
      workspaceData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating workspace:", error);
    throw error;
  }
};

export const deleteWorkspace = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/workspaces/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting workspace:", error);
    throw error;
  }
};
