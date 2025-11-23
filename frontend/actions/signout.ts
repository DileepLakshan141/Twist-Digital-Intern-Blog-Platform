"use server";
import { axiosInstance } from "@/axios/axios_instance";
import { AxiosError } from "axios";
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/signout");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message,
    };
  }
};
