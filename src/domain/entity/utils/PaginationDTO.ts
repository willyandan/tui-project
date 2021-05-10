import { IsPositive } from "class-validator";

export class PaginationDTO {
	
	@IsPositive()
	page!:number;
	
	@IsPositive()
	pageSize!:number;
}
