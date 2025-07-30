import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    message,
    error: err.message || "An unexpected error occurred",
  });
};

export default globalErrorHandler;
