import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClientValidationError } from "../../prisma/generated/prisma/internal/prismaNamespace";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: unknown = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.errorDetails ?? null;
  } else if (err instanceof Error) {
    statusCode = 400;
    message = "Validation Error";
    errorDetails = err.message;
  } else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 400;
        message = "Duplicate Value";
        errorDetails = { code: err.code};
        break;
      case "P2025":
        statusCode = 404;
        message = "Record Not Found";
        errorDetails = { code: err.code};
        break;
      case "P2003":
        statusCode = 400;
        message = "Foreign Key Constraint Failed";
        errorDetails = { code: err.code};
        break;
      case "P2004":
        statusCode = 400;
        message = "Database Error";
        errorDetails = { code: err.code};
        break;
      case "P2005":
        statusCode = 400;
        message = "Database Error";
        errorDetails = { code: err.code};
        break;
      default:
        statusCode = 400;
        message = "Database Error";
        errorDetails = { code: err.code};
    }
  } else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid Query";
    errorDetails = { message: err.message };
  }

  if(statusCode === 500 && config.NODE_ENV === "production") {
    message = "Internal Server Error";
    errorDetails = null;
  } else if (config.NODE_ENV != "development" && err instanceof Error === null) {
    errorDetails = { stack: err.stack};
  }


  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};
