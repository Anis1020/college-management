import z from "zod";

const userValidation = z.object({
  body: z.object({
    password: z
      .string()
      .min(4, "pass can not be less then 4")
      .max(10, "pass can not be more then 5")
      .optional(),
  }),
});
