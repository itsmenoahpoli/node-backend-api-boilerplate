import { type Request, type Response, type NextFunction } from "express";
import { validateRequestBody } from "@/utils";
import { AuthService } from "./auth.service";
import { SigninCredentialsDTO, SigninCredentials } from "./auth.dto";
import { HttpStatusCode } from "@/types";

export const AuthController = {
  async signinHandler(request: Request, response: Response, next: NextFunction) {
    const validatedPayload = await validateRequestBody(SigninCredentialsDTO, request.body);

    if (validatedPayload.isError) {
      next(validatedPayload.errors);
      return;
    }

    const result = await AuthService.signin(request.body as SigninCredentials);

    response.status(HttpStatusCode.OK).json(result).send();
  },
};
