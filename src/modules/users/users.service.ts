import { User } from "./user.dto";
import { userRepository } from "@/database";
import { encryptPassword } from "@/utils";

export const UsersService = {
	async findByEmail(email: string) {
		const user = await userRepository.findOneBy({ email });

		return user;
	},

	async createUser(data: User) {
		const user = userRepository.create({
			...data,
			password: await encryptPassword(data.password),
		});
		await userRepository.save(user);

		return user;
	},
};
