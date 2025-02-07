import JWT from "jsonwebtoken";
import { UsersService } from "@/modules/users/users.service";
import { SigninCredentials, SignupData } from "./auth.dto";
import { verifyPassword } from "@/utils";
import { SETTINGS } from "@/configs";

export const AuthService = {
	async signinAccount(credentials: SigninCredentials) {
		const user = await UsersService.findByEmail(credentials.email);
		const isPasswordVerified = user ? await verifyPassword(user?.password, credentials.password) : false;

		if (!user || !isPasswordVerified) {
			return null;
		}

		const authToken = JWT.sign({ userId: user.id, email: user.email }, SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });

		return {
			authToken,
		};
	},

	async signupAccount(accountData: SignupData) {
		const user = await UsersService.findByEmail(accountData.email);

		if (user) {
			return {
				accountExists: true,
			};
		}

		const createUser = await UsersService.createUser({ ...accountData, isEnabled: true });

		return {
			accountExists: false,
			user: createUser,
		};
	},
};
