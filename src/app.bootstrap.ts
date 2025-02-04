import express, { Application as ExpressApplication } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";

dotenv.config();

const app: ExpressApplication = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.disable("powered-by");

const runApp = (): void => {
  const appPort = SETTINGS.APP_PORT;

  if (!appPort) {
    console.error(`[ERROR]: No app port specified from settings`);
    return;
  }

  app.listen(appPort, () => {
    if (SETTINGS.APP_ENV === AppEnvironments.DEV) {
      console.info(`[APP]: App started and running in ${SETTINGS.APP_URL}`);
    }
  });
};

export { runApp };
