import { type Request, type Response, type NextFunction } from "express";
import { HttpStatusCode } from "@/types";

export const ErrorHandlerMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
  let errCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  let errMessage = error.message || "INTERNAL_SERVER_ERROR";
  let errTrace = process.env.NODE_ENV === "development" ? error.stack : null;

  if (error.type === "validation-error") {
    errCode = HttpStatusCode.BAD_REQUEST;
    errMessage = "BAD_REQUEST";

    response
      .status(errCode)
      .json({
        errCode,
        errMessage,
        errors: error.errors,
        errTrace,
      })
      .send();
  } else {
    response
      .status(errCode)
      .json({
        errCode,
        errMessage,
        errTrace,
      })
      .send();
  }
};
