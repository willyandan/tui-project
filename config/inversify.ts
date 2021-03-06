import { Container } from "inversify";
import { GetHotelByUidUseCase } from "../src/domain/useCase/GetHotelByUidUseCase/GetHotelByUidUseCase";
import { SearchHotelUseCase } from "../src/domain/useCase/SearchHotelUseCase/SearchHotelUseCase";
import { HotelRespositoryMongooseImpl } from "../src/infra/repository/HotelRepository/HotelRepositoryMongooseImpl";
import { WeatherRepositoryImplAccuWeather } from "../src/infra/repository/WeatherRepository/WeatherReposityImplAccuWeather";
import { GetHotelByUid } from "../src/infra/routes/impl/GetHotelByUid";
import { SearchHotels } from "../src/infra/routes/impl/SearchHotels";
import { IHotelRepository, IRoute, IWeatherRepository } from "./types";

export const container = new Container()

container.bind(IRoute).to(SearchHotels)
container.bind(IRoute).to(GetHotelByUid)

container.bind(IHotelRepository).to(HotelRespositoryMongooseImpl)
container.bind(IWeatherRepository).to(WeatherRepositoryImplAccuWeather)

container.bind(SearchHotelUseCase).toSelf()
container.bind(GetHotelByUidUseCase).toSelf()
