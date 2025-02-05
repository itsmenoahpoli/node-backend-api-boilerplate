import dotenv from "dotenv";
import { type AppEnvironment, AppEnvironments } from "@/types";

dotenv.config();

const APP_SECRET_KEY: string = process.env.APP_SECRET_KEY as string;
const APP_JWT_SECRET_KEY: string = process.env.APP_JWT_SECRET_KEY as string;
const APP_PORT: number = Number(process.env.APP_PORT) || 9000;
const APP_ENV: AppEnvironment = process.env.APP_ENV as AppEnvironment;
const APP_URL: string = APP_ENV === AppEnvironments.DEV ? `${process.env.APP_URL}:${APP_PORT}` : (process.env.APP_URL as string);

const checkCurrentEnvironment = (environment: AppEnvironment) => {
  return APP_ENV === environment;
};

export { checkCurrentEnvironment, APP_SECRET_KEY, APP_JWT_SECRET_KEY, APP_PORT, APP_ENV, APP_URL };
