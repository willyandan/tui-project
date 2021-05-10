import { inject, injectable } from "inversify";
import * as type from "../../../../config/types";
import { IHotelRepository } from "../../../infra/repository/HotelRepository/IHotelRepository";
import { NotFoundException } from "../../entity/exceptions/NotFoundException";
import { IHotel } from "../../entity/Hotel";
import { GetHotelByUidDTO } from "./GetHotelByUidDTO";

@injectable()
export class GetHotelByUidUseCase {
	
	@inject(type.IHotelRepository)
	private hotelRepository!: IHotelRepository
	
	async execute(params:GetHotelByUidDTO):Promise<IHotel>{
		try{
			const hotel = await this.hotelRepository.getById(params.id)
			return hotel
		}catch(err){
			throw new NotFoundException('Hotel not found')
		}
	}
}
