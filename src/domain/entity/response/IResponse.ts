export interface IResponse<T> {
	statusCode: number,
	body: T,
	headers?:Record<string,string>
}
