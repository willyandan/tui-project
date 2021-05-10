import { HttpMethods } from "../../domain/entity/request/HttpMethods";
import { Request } from "../../domain/entity/request/Request";
import { IResponse } from "../../domain/entity/response/IResponse";
import { IMiddleware } from "../middleware/IMiddleware";

export interface IRoute<Response> {
	path: string;
	method: HttpMethods;
	request:Request
	middlewares:Array<IMiddleware>
	execute(): Promise<IResponse<Response>>
}
