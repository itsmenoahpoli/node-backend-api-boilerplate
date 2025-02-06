import { type Request, type Response, type NextFunction } from "express";
import { HttpStatusCode } from "@/types";

export const checkAuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const header = request.header("Authorization");
  const token = header?.split(" ")[1];

  if (!header || !token) {
    return;
  }
};
