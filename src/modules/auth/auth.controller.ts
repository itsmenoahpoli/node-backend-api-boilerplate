import { type Request, type Response, type NextFunction } from "express";
import { validateRequestBody, SendHttpResponse } from "@/utils";
import { AuthService } from "./auth.service";
import { SigninCredentialsDTO, SigninCredentials, SignupDataDTO, SignupData } from "./auth.dto";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export const AuthController = {
	async signinHandler(request: Request, response: Response, next: NextFunction) {
		const validatePayload = await validateRequestBody(SigninCredentialsDTO, request.body);

		if (validatePayload.isError) {
			next(validatePayload.errors);
		}

		const result = await AuthService.signinAccount(request.body as SigninCredentials);

		if (!result) {
			SendHttpResponse(response, HttpErrorTypes.UNAUTHORIZED_ERROR, HttpStatusCode.UNAUTHORIZED);
			return;
		}

		SendHttpResponse(response, result, HttpStatusCode.OK);
	},

	async signupHandler(request: Request, response: Response, next: NextFunction) {
		const validatePayload = await validateRequestBody(SignupDataDTO, request.body);

		if (validatePayload.isError) {
			return next(validatePayload.errors);
		}

		const result = await AuthService.signupAccount(request.body as SignupData);

		if (result.accountExists) {
			SendHttpResponse(response, HttpErrorTypes.ALREADY_EXISTS, HttpStatusCode.UNPROCESSABLE_ENTITY);
			return;
		}

		SendHttpResponse(response, result, HttpStatusCode.CREATED);
	},
};
