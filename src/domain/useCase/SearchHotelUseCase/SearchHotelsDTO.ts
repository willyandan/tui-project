import { Type, Transform } from "class-transformer"
import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import { PaginationDTO } from "../../entity/utils/PaginationDTO"

function toBoolean(value?:string){
	if(value === undefined){
		return true;
	}
	return Boolean(Number(value))
}

export class SearchHotelsDto extends PaginationDTO {

	@IsOptional()
	@IsLatitude()
	@Type(()=>Number)
	lat?:number
	
	@IsOptional()
	@IsLongitude()
	@Type(()=>Number)
	lng?:number
	
	@IsOptional()
	@IsString()
	cityCode?:string

	@IsOptional()
	@IsPositive()
	@Type(()=>Number)
	radius?:number

	@IsOptional()
	@IsBoolean()
	@Transform(value=>toBoolean(value.value),{toClassOnly:true})
	asc?:boolean
}
