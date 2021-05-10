import { inject, injectable } from "inversify";
import { IHotel } from "../../../domain/entity/Hotel";
import { HttpMethods } from "../../../domain/entity/request/HttpMethods";
import { IResponse } from "../../../domain/entity/response/IResponse";
import { GetHotelByUidDTO } from "../../../domain/useCase/GetHotelByUidUseCase/GetHotelByUidDTO";
import { GetHotelByUidUseCase } from "../../../domain/useCase/GetHotelByUidUseCase/GetHotelByUidUseCase";
import { BaseRoute } from "./BaseRoute";

@injectable()
export class GetHotelByUid extends BaseRoute<IHotel> {
	path="/api/hotel/:id"
	method=HttpMethods.GET

	@inject(GetHotelByUidUseCase)
	private useCase!:GetHotelByUidUseCase

	async execute():Promise<IResponse<IHotel>> {
		const dto = await this.requestToUseCaseDto(GetHotelByUidDTO)
		const response = await this.useCase.execute(dto)
		return {
			statusCode:200,
			body:response
		}

	}
}
