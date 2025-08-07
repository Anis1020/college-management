import z from "zod";
import { UserStatus } from "./constant";

const createUserValidation = z.object({
  body: z.object({
    password: z
      .string()
      .min(4, "pass can not be less then 4")
      .max(10, "pass can not be more then 5")
      .optional(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus]),
  }),
});

export const UserValidations = {
  createUserValidation,
  changeStatusValidationSchema,
};
