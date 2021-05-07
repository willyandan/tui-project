import { PaginatedResponse } from "../../../domain/entity/response/PaginatedResponse";

export interface IHotelRepository {
	search():Promise<PaginatedResponse<IHotel>>

}
