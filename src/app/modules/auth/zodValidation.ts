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

export const AuthValidation = {
  loginValidationSchema,
  changePassValidationSchema,
  refreshTokenValidationSchema,
};
