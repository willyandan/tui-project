import { Container } from "inversify";
import { SearchHotelUseCase } from "../src/domain/useCase/SearchHotelUseCase";
import { HotelRespositoryMongooseImpl } from "../src/infra/repository/HotelRepository/HotelRepositoryMongooseImpl";
import { SearchHotels } from "../src/infra/routes/impl/SearchHotels";
import { IHotelRepository, IRoute } from "./types";

export const container = new Container()

container.bind(IRoute).to(SearchHotels)

container.bind(IHotelRepository).to(HotelRespositoryMongooseImpl)

container.bind(SearchHotelUseCase).toSelf()
