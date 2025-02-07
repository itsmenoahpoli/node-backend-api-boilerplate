import { DataSource, Repository, type DataSourceOptions } from "typeorm";
import { BaseRepository } from "./repositories";
import { User } from "./entities";
import { SETTINGS } from "@/configs";

const DBDataSource = new DataSource({
	type: SETTINGS.APP_DB_TYPE,
	host: SETTINGS.APP_DB_HOST,
	port: Number(SETTINGS.APP_DB_PORT),
	username: SETTINGS.APP_DB_USERNAME,
	password: SETTINGS.APP_DB_PASSWORD,
	database: SETTINGS.APP_DB_DATABASE,
	synchronize: true,
	logging: true,
	entities: [__dirname + "/entities/*.entity.ts"],
	migrations: [__dirname + "/migrations/*.migration.ts"],
	subscribers: [],
} as DataSourceOptions);

let userRepository: Repository<User>;

const initializeDatabase = () => {
	DBDataSource.initialize()
		.then(() => {
			console.info("Database successfully sycned!");

			// Set repositories
			userRepository = DBDataSource.getRepository(User);
		})
		.catch((error) => {
			console.error("Failed to sync database");
			console.error(error);
		});
};

export { DBDataSource, initializeDatabase, BaseRepository, userRepository, User as UserEntity };
