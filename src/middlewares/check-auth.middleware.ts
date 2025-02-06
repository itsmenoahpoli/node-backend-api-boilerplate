import { type Request, type Response, type NextFunction } from "express";
import JWT from "jsonwebtoken";
import { SendHttpResponse } from "@/utils";
import { SETTINGS } from "@/configs";
import { HttpStatusCode } from "@/types";

export const CheckAuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const header = request.header("Authorization");
  const token = header?.split(" ")[1];

  if (!header || !token) {
    SendHttpResponse(
      response,
      {
        message: "UNAUTHORIZED",
      },
      HttpStatusCode.UNAUTHORIZED
    );

    return;
  }

  JWT.verify(token, SETTINGS.APP_JWT_SECRET_KEY, (error, user) => {
    if (error) {
      console.log("CheckAuthMiddleware", error);
      SendHttpResponse(response, { message: "FORBIDDEN" }, HttpStatusCode.FORBIDDEN);
      return;
    }

    request.user = user;

    next();
  });
};
