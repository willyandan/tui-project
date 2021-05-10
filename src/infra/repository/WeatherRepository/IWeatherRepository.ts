import { injectable } from "inversify";
import { Weather } from "../../../domain/entity/Weather";

export interface IWeatherRespository {
	getLocation(lat:number, lng:number):Promise<Weather>
}
