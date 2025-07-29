"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || "something went wrong";
    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        message,
        error: err.message || "An unexpected error occurred",
    });
};
exports.default = globalErrorHandler;
