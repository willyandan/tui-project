import { inject, injectable } from 'inversify'
import { IHotel } from '../../../domain/entity/Hotel'
import { HttpMethods } from '../../../domain/entity/request/HttpMethods'
import { SearchHotelsRequest } from '../../../domain/entity/request/SearchHotelsRequest'
import { IResponse } from '../../../domain/entity/response/IResponse'
import { PaginatedResponse } from '../../../domain/entity/response/PaginatedResponse'
import { SearchHotelUseCase } from '../../../domain/useCase/SearchHotelUseCase'
import { IRoute } from '../IRoute'
import { BaseRoute } from './BaseRoute'

@injectable()
export class SearchHotels extends BaseRoute<SearchHotelsRequest, PaginatedResponse<IHotel>> {
	path = '/api/hotel/search'
	method = HttpMethods.GET

	@inject(SearchHotelUseCase)
	private searchHotelUseCase!: SearchHotelUseCase;

	validate(){
		super.validate(new SearchHotelsRequest())
	}

	async execute():Promise<IResponse<PaginatedResponse<IHotel>>> {
		if(!this.request){
			throw new Error('bad request')
		}
		const response = await this.searchHotelUseCase.execute(this.request)
		//@TODO Retornar useCase de buscas
		return {
			statusCode:200, 
			body:response
		}
	}
}
