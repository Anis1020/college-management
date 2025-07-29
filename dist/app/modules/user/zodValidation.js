"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const userValidation = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default
            .string()
            .min(4, "pass can not be less then 4")
            .max(10, "pass can not be more then 5")
            .optional(),
    }),
});
