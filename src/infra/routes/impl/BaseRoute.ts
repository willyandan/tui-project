import { plainToClass, plainToClassFromExist } from "class-transformer";
import { injectable, named } from "inversify";
import { HttpMethods } from "../../../domain/entity/request/HttpMethods";
import { IResponse } from "../../../domain/entity/response/IResponse";
import { IRoute } from "../IRoute";

@injectable()
export abstract class BaseRoute<Request, Response> implements IRoute<Response> {
	path = '/'
	query:Record<string, string | number | Array<string|number>> = {}
	body:Record<string, any> = {}
	params:Record<string, string> = {}
	method = HttpMethods.GET;
	request?:Request;	

	validate(request?:Request){
		this.request = plainToClassFromExist(request,{
			...this.body,
			...this.query,
			...this.params

		})	
	}

	parseRequest(
		query:Record<string, any>, 
		body:Record<string,any>, 
		params:Record<string,string>
	){
		this.body = body
		this.query = query
		this.params = params
	}

	execute():Promise<IResponse<Response>>{
		throw new Error('Method not implemented')	
	}	
}
