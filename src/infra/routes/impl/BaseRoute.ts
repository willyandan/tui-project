import { ClassConstructor, plainToClass, plainToClassFromExist } from "class-transformer";
import { injectable } from "inversify";
import { HttpMethods } from "../../../domain/entity/request/HttpMethods";
import { IResponse } from "../../../domain/entity/response/IResponse";
import { IRoute } from "../IRoute";
import { Request } from "../../../domain/entity/request/Request";
import { validate, validateOrReject, ValidationError } from "class-validator";
import { IMiddleware } from "../../middleware/IMiddleware";
import { BadRequestException } from "../../../domain/entity/exceptions/BadRequestException";

@injectable()
export abstract class BaseRoute<Response> implements IRoute<Response> {
	path = '/'
	method = HttpMethods.GET;
	request!:Request;	
	middlewares:Array<IMiddleware> = []

	prepareRequest(body:Record<string, any>, query:Record<string, any>, params:Record<string, string>){
		this.request = plainToClass(Request,{body,query,params})
	}

	private async validateClass(cls:object):Promise<void>{
		try{
			await validateOrReject(cls)
		}
		catch(err){
			const errorData = err as Array<ValidationError>
			throw new BadRequestException('Bad request!',{errors:errorData})
		}
	}

	async requestToUseCaseDto<T extends object>(cls:ClassConstructor<T>):Promise<T>{
		const dto =  plainToClass(cls, {
			...this.request.body,
			...this.request.query,
			...this.request.params
		})
		await this.validateClass(dto)
		return dto;
	}
	
	execute():Promise<IResponse<Response>>{
		throw new Error('Method not implemented')	
	}	
}
