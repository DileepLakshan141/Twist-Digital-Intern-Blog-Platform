"use server";
import { z } from "zod";
import { UserSchema } from "@/schemas/user";
import { axiosInstance } from "@/axios/axios_instance";

export const createNewUser = async (values: z.infer<typeof UserSchema>) => {
  const validation_results = UserSchema.safeParse(values);
  if (validation_results) {
    const response = await axiosInstance.post("/users/signup", {
      username: values.username,
      email: values.email,
      password: values.password,
    });

    return response.data;
  } else {
    return { success: false, message: "validation failed" };
  }
};
