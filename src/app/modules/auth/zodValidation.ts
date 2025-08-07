import z from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});
const changePassValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ message: "old Password is need to change pass" }),
    newPassword: z.string(),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ message: "Refresh token is required" }),
  }),
});
const forgetPassValidationSchema = z.object({
  body: z.object({
    id: z.string({ message: "ID is need to change pass" }),
  }),
});
const resetPassValidationSchema = z.object({
  body: z.object({
    id: z.string({ message: "ID is need to change pass" }),
    newPassword: z.string({ message: "new pass is need to change pass" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePassValidationSchema,
  refreshTokenValidationSchema,
  forgetPassValidationSchema,
  resetPassValidationSchema,
};
