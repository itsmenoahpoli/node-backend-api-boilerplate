import { type Response } from "express";

export const SendHttpResponse = <T = any>(response: Response, data: T, statusCode: number) => {
  response.status(statusCode).json(data);
};
