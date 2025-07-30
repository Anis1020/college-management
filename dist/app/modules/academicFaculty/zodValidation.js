"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createAcademicFacultyValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
    }),
});
const updateAcademicFacultyValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
    }),
});
exports.AcademicFacultyValidations = {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation,
};
