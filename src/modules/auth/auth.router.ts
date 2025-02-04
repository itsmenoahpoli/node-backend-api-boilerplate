import { Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRouter = Router().post("/signin", AuthController.userSignin);
