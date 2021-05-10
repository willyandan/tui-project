import { inject, injectable } from 'inversify'
import { IHotel } from '../../../domain/entity/Hotel'
import { HttpMethods } from '../../../domain/entity/request/HttpMethods'
import { SearchHotelsDto } from '../../../domain/useCase/SearchHotelUseCase/SearchHotelsDTO'
import { IResponse } from '../../../domain/entity/response/IResponse'
import { PaginatedResponse } from '../../../domain/entity/response/PaginatedResponse'
import { SearchHotelUseCase } from '../../../domain/useCase/SearchHotelUseCase/SearchHotelUseCase'
import { IRoute } from '../IRoute'
import { BaseRoute } from './BaseRoute'
import { PaginationMiddleware } from '../../middleware/impl/PaginationMiddleware'

@injectable()
export class SearchHotels extends BaseRoute<PaginatedResponse<IHotel>> {
	path = '/api/hotel/search'
	method = HttpMethods.GET
	middlewares = [new PaginationMiddleware()]

	@inject(SearchHotelUseCase)
	private searchHotelUseCase!: SearchHotelUseCase;

	async execute():Promise<IResponse<PaginatedResponse<IHotel>>> {
		const searchHotelDto = await this.requestToUseCaseDto<SearchHotelsDto>(SearchHotelsDto)
		const response = await this.searchHotelUseCase.execute(searchHotelDto)
		return {
			statusCode:200, 
			body:response
		}
	}
}
