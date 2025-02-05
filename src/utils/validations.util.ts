import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

type RequestBodyValidationResult = {
  isError: boolean;
  errors: { [type: string]: string }[] | unknown;
};

const createRequestBodyValidationResult = (result: RequestBodyValidationResult) => {
  const { isError, errors } = result;

  return {
    isError,
    errors,
  };
};

export const validateRequestBody = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: object
): Promise<RequestBodyValidationResult> => {
  const transformedClass = plainToClass(dto, obj);
  const errors = await validate(transformedClass);

  if (errors.length) {
    const errorData = errors.map((err) => {
      const { property, constraints } = err;

      return {
        field: property,
        errors: constraints,
      };
    });

    return createRequestBodyValidationResult({ isError: true, errors: errorData });
  }

  return createRequestBodyValidationResult({ isError: false, errors: null });
};
