import { Repository, ObjectLiteral } from "typeorm";

// TODO: Finish implementation

export class BaseRepository<T extends ObjectLiteral> {
	constructor(protected repository: Repository<T>) {}
}
