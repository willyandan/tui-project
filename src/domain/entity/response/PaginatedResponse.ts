export class PaginatedResponse<T> {

	constructor(
		public data:Array<T>,
		public page:number,
		public pageSize:number
	
	){}
}
