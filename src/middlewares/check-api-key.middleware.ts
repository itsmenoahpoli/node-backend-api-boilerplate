import { type Request, type Response, type NextFunction } from "express";
import { SETTINGS } from "@/configs";
import { HttpStatusCode } from "@/types";

export const CheckApiKeyMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
  const header = request.header("X-API-KEY");

  if (!header || header !== SETTINGS.APP_SECRET_KEY) {
    response
      .status(HttpStatusCode.FORBIDDEN)
      .json({
        message: "API_KEY_MISSING",
      })
      .send();
  } else {
    next();
  }
};
