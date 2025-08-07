import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./zodValidation";
import { AuthController } from "./controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../user/constant";

const router = Router();
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);
router.post(
  "/change-password",
  authValidation(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePassValidationSchema),
  AuthController.changePassword
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);
router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPassValidationSchema),
  AuthController.forgetPassword
);
router.post(
  "/reset-password",
  validateRequest(AuthValidation.forgetPassValidationSchema),
  AuthController.resetPassword
);
export const AuthRoutes = router;
