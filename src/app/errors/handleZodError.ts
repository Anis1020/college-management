import { ZodError } from "zod";

export const handleZodError = (err: ZodError) => {
  const errorSources = err.issues.map((issue) => {
    const rawPath = issue?.path[issue.path.length - 1];
    return {
      path:
        typeof rawPath === "string" || typeof rawPath === "number"
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
