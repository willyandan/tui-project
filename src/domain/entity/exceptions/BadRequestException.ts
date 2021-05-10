import { BaseException } from "./BaseException";

export class BadRequestException extends BaseException<Record<string, any>> {
	constructor(message:string, body:Record<string, any>){
		super(400,body,message)
	}
}
