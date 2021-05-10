import { BaseException } from "./BaseException";

export class NotFoundException extends BaseException<undefined> {
	constructor(message:string){
		super(404,undefined,message)	
	}	
}
