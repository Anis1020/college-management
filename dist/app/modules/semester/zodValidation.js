"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const constant_1 = require("./constant");
const createSemesterValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...constant_1.SemesterNames]),
        year: zod_1.default.string(),
        code: zod_1.default.enum([...constant_1.SemesterCodes]),
        startMonth: zod_1.default.enum([...constant_1.SemesterMonths]),
        endMonth: zod_1.default.enum([...constant_1.SemesterMonths]),
    }),
});
const updateSemesterValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...constant_1.SemesterNames]).optional(),
        year: zod_1.default.string().optional(),
        code: zod_1.default.enum([...constant_1.SemesterCodes]).optional(),
        startMonth: zod_1.default.enum([...constant_1.SemesterMonths]).optional(),
        endMonth: zod_1.default.enum([...constant_1.SemesterMonths]).optional(),
    }),
});
exports.SemesterValidations = {
    createSemesterValidation,
    updateSemesterValidation,
};
