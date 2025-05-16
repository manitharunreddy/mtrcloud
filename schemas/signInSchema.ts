import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, {
      message: "Email is Required",
    })
    .email({
      message: "Please Enter a valid email",
    }),
  password: z
    .string()
    .min(1, {
      message: "Password is Required",
    })
    .min(8, {
      message: "Password Should Be Min Of 8 characters",
    }),
});
