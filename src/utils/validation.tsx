import { z } from "zod";

/**
 * 🔐 SIGNUP SCHEMA
 */
export const signupFormSchema = z
  .object({
    fullNames: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .trim(),

    email: z
      .string()
      .email("Please enter a valid email address")
      .toLowerCase()
      .trim(),

    phoneNumber: z
      .string()
      .min(11, "Phone number must be at least 11 characters")
      .regex(/^\d+$/, "Phone number must contain only digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormData = z.infer<typeof signupFormSchema>;

/**
 * 🔐 LOGIN SCHEMA
 */
export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;