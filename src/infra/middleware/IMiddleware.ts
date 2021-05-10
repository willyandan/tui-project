import { Request } from "../../domain/entity/request/Request";
import { IResponse } from "../../domain/entity/response/IResponse";

export interface IMiddleware {
	execute(request:Request):Promise<IResponse<any>|void>
}
