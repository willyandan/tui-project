import { Weather } from "../../../domain/entity/Weather";
import { IWeatherRespository } from "./IWeatherRepository";
import  axios, { AxiosInstance } from 'axios'
import { injectable } from "inversify";
import { plainToClass } from "class-transformer";

@injectable()
export class WeatherRepositoryImplAccuWeather implements IWeatherRespository {
	private axiosInstace:AxiosInstance
	constructor(){
		this.axiosInstace = axios.create({
			baseURL:'http://dataservice.accuweather.com'
		}) 
	}
	async getLocation(lat:number, lng:number):Promise<Weather>{
		try{
			const {data} = await this.axiosInstace.get('/locations/v1/cities/geoposition/search',{
				params:{
					apikey:process.env.ACCU_WEATHER_API_KEY,
					q:`${lat},${lng}`
				}
			})
			const id = data.Key
			const {data:[weatherResponse]} = await this.axiosInstace.get(`http://dataservice.accuweather.com/currentconditions/v1/${id}`,{
				params:{
					apikey:process.env.ACCU_WEATHER_API_KEY,
				}
			})
			return plainToClass(Weather,{
				metric:{value:weatherResponse.Temperature.Metric.Value},
				imperial:{value:weatherResponse.Temperature.Imperial.Value}
			})

		}catch(err){
			console.log(err.request.data)
			throw err
		}
	}
}
