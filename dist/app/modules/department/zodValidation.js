"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createDepartmentValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        academicFaculty: zod_1.default.string(),
    }),
});
const updateDepartmentValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        academicFaculty: zod_1.default.string().optional(),
    }),
});
exports.DepartmentValidations = {
    createDepartmentValidation,
    updateDepartmentValidation,
};
