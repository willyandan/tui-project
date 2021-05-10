import { IResponse } from "../response/IResponse";

interface BaseResponse<T> {
	message:string,
	status:number,
	data:T
}

export class BaseException<T> extends Error implements IResponse<BaseResponse<T>> {
	body:BaseResponse<T>

	constructor(
		public statusCode:number, 
		body:T,
		message:string
	){
		
		super(`Exception - ${message}`)
		this.body = {
			status:this.statusCode,
			message,
			data:body
		}
	}


}
