export enum AppEnvironments {
  DEV = "DEV",
  QA = "QA",
  PROD = "PROD",
}

export type AppEnvironment = "DEV" | "QA" | "PROD";

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}
