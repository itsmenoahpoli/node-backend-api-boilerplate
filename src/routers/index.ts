import { Application } from "express";
import { SystemRouter, AuthRouter } from "./module-routers";
import { SETTINGS } from "@/configs";
import { AppEnvironments } from "@/types";

const routesConfig = [
  {
    uri: "/system",
    router: SystemRouter,
  },
  {
    uri: "/auth",
    router: AuthRouter,
  },
];

const printRouteRoutes = (route: any) => {
  const uriModule = route.uri.replace("/", "").toUpperCase();
  console.log("--------------------------------------------------------------------------------------");
  console.log(`${uriModule} Routes \n---------------`);

  route.router.stack.forEach((stack: any) => {
    if (stack.route) {
      // @ts-ignore
      const methods = Object.keys(stack.route?.methods).join(", ").toUpperCase();

      console.log(`${methods} ${stack.route.path}`);
    }
  });
  console.log("--------------------------------------------------------------------------------------");
};

export const initializeApiRoutes = (app: Application, apiPrefix: string = "/api") => {
  routesConfig.forEach((route) => {
    const uri: string = apiPrefix.concat(route.uri);

    app.use(uri, route.router);

    if (SETTINGS.checkCurrentEnvironment(AppEnvironments.DEV)) {
      // printRouteRoutes(route);
    }
  });
};
