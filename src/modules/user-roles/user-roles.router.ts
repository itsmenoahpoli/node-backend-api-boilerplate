import { Router } from "express";
import { UserRolesController } from "./user-roles.controller";

export class UserRolesRouter {
	private router: Router;
	private userRolesController: UserRolesController;

	constructor() {
		this.router = Router();
		this.userRolesController = new UserRolesController();

		this.initializeRoutes();
	}

	get routerRoutes() {
		return this.router;
	}

	private initializeRoutes() {
		this.router.post("/", this.userRolesController.fetchListHandler);
		this.router.post("/:id", this.userRolesController.fetchListHandler);
		this.router.post("/:id", this.userRolesController.fetchListHandler);
		this.router.post("/:id", this.userRolesController.fetchListHandler);
		this.router.post("/", this.userRolesController.fetchListHandler);
	}
}
