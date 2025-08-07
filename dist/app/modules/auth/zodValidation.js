"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string(),
        password: zod_1.default.string(),
    }),
});
const changePassValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        oldPassword: zod_1.default.string({ message: "old Password is need to change pass" }),
        newPassword: zod_1.default.string(),
    }),
});
const refreshTokenValidationSchema = zod_1.default.object({
    cookies: zod_1.default.object({
        refreshToken: zod_1.default.string({ message: "Refresh token is required" }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePassValidationSchema,
    refreshTokenValidationSchema,
};
