import JWT from "jsonwebtoken";
import { UsersService } from "@/modules/users/users.service";
import { RequestOtp, type SigninCredentials, type SignupData } from "./auth.dto";
import { verifyPassword } from "@/utils";
import { SETTINGS } from "@/configs";

export class AuthService {
	public async signinAccount(credentials: SigninCredentials) {
		const user = await UsersService.findByEmail(credentials.email);
		const isPasswordVerified = user ? await verifyPassword(credentials.password, user?.password) : false;

		if (!user || !isPasswordVerified) {
			return null;
		}

		delete (user as any).password;
		const authToken = JWT.sign({ user }, SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });

		return {
			authToken,
		};
	}

	public async signupAccount(accountData: SignupData) {
		const user = await UsersService.findByEmail(accountData.email);

		if (user) {
			return {
				accountExists: true,
			};
		}

		const createUser = await UsersService.createUser({ ...accountData, isEnabled: true });
		delete (createUser as any).password;

		return {
			accountExists: false,
			user: createUser,
		};
	}

	public async requestOtp(data: RequestOtp) {
		//
	}
}
