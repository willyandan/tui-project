import { inject, injectable } from "inversify";
import * as type from "../../../../config/types";
import { IHotelRepository } from "../../../infra/repository/HotelRepository/IHotelRepository";
import { IWeatherRespository } from "../../../infra/repository/WeatherRepository/IWeatherRepository";
import { BaseException } from "../../entity/exceptions/BaseException";
import { NotFoundException } from "../../entity/exceptions/NotFoundException";
import { IHotel } from "../../entity/Hotel";
import { Weather } from "../../entity/Weather";
import { GetHotelByUidDTO } from "./GetHotelByUidDTO";

@injectable()
export class GetHotelByUidUseCase {
	
	@inject(type.IHotelRepository)
	private hotelRepository!: IHotelRepository
	
	@inject(type.IWeatherRepository)
	private weatherRepository!:IWeatherRespository

	async execute(params:GetHotelByUidDTO):Promise<{hotel:IHotel, weather:Weather}>{
		try{
			const hotel = await this.hotelRepository.getById(params.id)
			const weather = await this.weatherRepository.getLocation(hotel.location.coordinates[1], hotel.location.coordinates[0])
			return {hotel, weather}
		}catch(err){
			throw new NotFoundException('Hotel not found')
		}
	}
}
