"use server";
import { z } from "zod";
import { UserSchema } from "@/schemas/user";
import { axiosInstance } from "@/axios/axios_instance";
import { AxiosError } from "axios";

export const createNewUser = async (values: z.infer<typeof UserSchema>) => {
  const validation_results = UserSchema.safeParse(values);
  if (validation_results) {
    try {
      const response = await axiosInstance.post("/users/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message,
      };
    }
  } else {
    return { success: false, message: "validation failed" };
  }
};
