"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        const rawPath = issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1];
        return {
            path: typeof rawPath === "string" || typeof rawPath === "number"
                ? rawPath
                : String(rawPath),
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "zod validation error",
        errorSources,
    };
};
exports.handleZodError = handleZodError;
