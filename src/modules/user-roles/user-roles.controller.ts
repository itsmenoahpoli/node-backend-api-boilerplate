import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { UserRolesService } from "./user-roles.service";

export class UserRolesController extends BaseController {
	public userRolesService: UserRolesService;

	constructor() {
		super();

		this.userRolesService = new UserRolesService();
		this.bindClassMethods(this);
	}

	public async fetchListHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}

	public async fetchByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}

	public async updateByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}

	public async deleteByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}

	public async createHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}
}
