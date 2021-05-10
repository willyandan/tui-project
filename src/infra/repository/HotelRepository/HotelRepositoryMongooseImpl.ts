import { injectable } from "inversify";
import { Hotels, IHotel } from "../../../domain/entity/Hotel";
import { PaginatedResponse } from "../../../domain/entity/response/PaginatedResponse";
import { SearchHotelsDto } from "../../../domain/useCase/SearchHotelUseCase/SearchHotelsDTO";
import { IHotelRepository } from "./IHotelRepository";

@injectable()
export class HotelRespositoryMongooseImpl implements IHotelRepository{
	async search(params:SearchHotelsDto){
		const query = Hotels.find()		
		if(params.cityCode){
			query.where('hotel.cityCode',params.cityCode)
		}else if(params.lat && params.lng){
			const radius = params.radius ?? 5
			query.where('location').within({
				center: [params.lng, params.lat], radius: radius/6371, unique: true, spherical: true 
			})
		}
		let asc = params.asc
		if(asc === undefined){
			asc = true
		}
		query.sort({'offers.0.price.base':asc?1:-1})
		const hotels = await query.limit(params.pageSize).skip((params.page - 1) * params.pageSize)
	
		const paginatedHotels = new PaginatedResponse<IHotel>(hotels,params.page,params.pageSize)
		return paginatedHotels;
	}
	
	async getById(id:string){
		const hotel = await Hotels.findById(id)
		if(!hotel){
			throw new Error('hotel not found')
		}
		return hotel;
	}
}
