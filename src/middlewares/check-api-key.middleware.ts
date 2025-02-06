import { type Request, type Response, type NextFunction } from "express";
import { SETTINGS } from "@/configs";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode } from "@/types";

export const CheckApiKeyMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const header = request.header("X-API-KEY");

  if (!header || header !== SETTINGS.APP_SECRET_KEY) {
    SendHttpResponse(
      response,
      {
        message: "API_KEY_MISSING",
      },
      HttpStatusCode.FORBIDDEN
    );

    return;
  }

  next();
};
