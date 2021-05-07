import { inject, injectable } from "inversify";
import { IHotelRepository } from "../../infra/repository/HotelRepository/IHotelRepository";
import { IHotel } from "../entity/Hotel";
import { SearchHotelsRequest } from "../entity/request/SearchHotelsRequest";
import { PaginatedResponse } from "../entity/response/PaginatedResponse";
import * as types from '../../../config/types'
@injectable()
export class SearchHotelUseCase {
	@inject(types.IHotelRepository)
	private hotelRepository!: IHotelRepository
	async execute(request:SearchHotelsRequest):Promise<PaginatedResponse<IHotel>>{
		const hotels = await this.hotelRepository.search();
		return hotels;
	}

}
