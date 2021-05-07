import { injectable } from "inversify";
import { Hotels, IHotel } from "../../../domain/entity/Hotel";
import { PaginatedResponse } from "../../../domain/entity/response/PaginatedResponse";
import { IHotelRepository } from "./IHotelRepository";

@injectable()
export class HotelRespositoryMongooseImpl implements IHotelRepository{
	async search(){
		const hotels = await Hotels.find({}).limit(10).skip(0)

		const paginatedHotels = new PaginatedResponse<IHotel>(hotels,1,10)
		return paginatedHotels;
	}
}
