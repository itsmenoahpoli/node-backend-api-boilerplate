import { type Request, type Response, type NextFunction } from "express";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode } from "@/types";

export function ValidateUrlParams(requiredParams: string | string[]) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = function (request: Request, response: Response, next: NextFunction) {
			const missingParams = Array.isArray(requiredParams)
				? requiredParams.filter((param) => !request.params[param]).join(", ")
				: requiredParams;

			if (missingParams.length > 0) {
				return SendHttpResponse(response, { error: `Missing parameters: ${missingParams}` }, HttpStatusCode.BAD_REQUEST);
			}

			return originalMethod.apply(this, arguments);
		};
	};
}
