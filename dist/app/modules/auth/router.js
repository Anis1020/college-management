"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zodValidation_1 = require("./zodValidation");
const controller_1 = require("./controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const constant_1 = require("../user/constant");
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.default)(zodValidation_1.AuthValidation.loginValidationSchema), controller_1.AuthController.loginUser);
router.post("/change-password", (0, authValidation_1.default)(constant_1.USER_ROLE.admin, constant_1.USER_ROLE.faculty, constant_1.USER_ROLE.student), (0, validateRequest_1.default)(zodValidation_1.AuthValidation.changePassValidationSchema), controller_1.AuthController.changePassword);
router.post("/refresh-token", (0, validateRequest_1.default)(zodValidation_1.AuthValidation.refreshTokenValidationSchema), controller_1.AuthController.refreshToken);
router.post("/forget-password", (0, validateRequest_1.default)(zodValidation_1.AuthValidation.forgetPassValidationSchema), controller_1.AuthController.forgetPassword);
router.post("/reset-password", (0, validateRequest_1.default)(zodValidation_1.AuthValidation.forgetPassValidationSchema), controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
