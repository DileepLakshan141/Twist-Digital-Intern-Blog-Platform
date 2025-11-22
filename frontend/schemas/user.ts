import { z } from "zod";

export const UserSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must have minimum 5 letters")
      .max(20, "Username max 20 letters allowed"),
    email: z.email("Valid email address required"),
    password: z.string().min(8, "Minimum 8 characters or letters required"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must be same in both places",
    path: ["confirm_password"],
  });

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum 8 characters or letters required"),
});
