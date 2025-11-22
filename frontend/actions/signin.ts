"use server";
import { z } from "zod";
import { LoginSchema } from "@/schemas/user";
import { axiosInstance } from "@/axios/axios_instance";

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validation_results = LoginSchema.safeParse(values);
  if (validation_results) {
    const response = await axiosInstance.post("/auth/signin", {
      email: values.email,
      password: values.password,
    });
    return response.data;
  } else {
    return { success: false, message: "signin validation failed" };
  }
};
