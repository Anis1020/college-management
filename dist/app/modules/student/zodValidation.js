"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createStudentValidation = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string(),
        user: zod_1.default.string(),
        name: zod_1.default.object({
            firstName: zod_1.default.string(),
            lastName: zod_1.default.string(),
        }),
        gender: zod_1.default.string(),
        dateOfBirth: zod_1.default.string(),
        email: zod_1.default.string(),
        contactNo: zod_1.default.string(),
        presentAddress: zod_1.default.string(),
        permanentAddress: zod_1.default.string(),
        guardian: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string(),
                lastName: zod_1.default.string(),
            }),
            relation: zod_1.default.string(),
            contactNo: zod_1.default.string(),
        }),
        localGuardian: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string(),
                lastName: zod_1.default.string(),
            }),
            relation: zod_1.default.string(),
            contactNo: zod_1.default.string(),
        }),
        profileImage: zod_1.default.string().optional(),
        academicDepartment: zod_1.default.string(),
        admissionSemester: zod_1.default.string(),
    }),
});
exports.StudentValidations = {
    createStudentValidation,
};
