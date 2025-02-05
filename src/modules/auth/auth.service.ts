import JWT from "jsonwebtoken";
import { SigninCredentials } from "./auth.dto";
import { SETTINGS } from "@/configs";

export const AuthService = {
  async signin(credentials: SigninCredentials) {
    const authToken = JWT.sign({ user: "John Doe" }, SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });

    return {
      authToken,
    };
  },
};
