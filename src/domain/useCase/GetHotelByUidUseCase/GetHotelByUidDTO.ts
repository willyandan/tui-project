import { IsString } from "class-validator";

export class GetHotelByUidDTO {
	@IsString()
	id!:string
}
