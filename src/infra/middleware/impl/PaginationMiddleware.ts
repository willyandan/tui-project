import { Request } from "../../../domain/entity/request/Request";
import { IMiddleware } from "../IMiddleware";

export class PaginationMiddleware implements IMiddleware {
	async execute(request:Request){
		request.body.page = request.body.page ?? 1;
		request.body.pageSize = request.body.pageSize ?? 50;
	}
}
