import { IHotel } from "../../../domain/entity/Hotel";
import { PaginatedResponse } from "../../../domain/entity/response/PaginatedResponse";
import { SearchHotelsDto } from "../../../domain/useCase/SearchHotelUseCase/SearchHotelsDTO";

export interface IHotelRepository {
	search(params:SearchHotelsDto):Promise<PaginatedResponse<IHotel>>
	getById(id:string):Promise<IHotel>
}
