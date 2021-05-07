import { HttpMethods } from "../../domain/entity/request/HttpMethods";
import { IResponse } from "../../domain/entity/response/IResponse";

export interface IRoute<Response> {
	path: string;
	method: HttpMethods;
	query:Record<string, string | number | Array<string | number>>
	body:Record<string, any>
	params:Record<string, string>
	execute(): Promise<IResponse<Response>>
}
