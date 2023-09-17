interface requestOptionsType<T = any> {
	data?: T,
	method: 'GET' | 'POST',
	url: string,
	header?: object,
	timeout?: number,
	baseUrl?: string,
}

interface uniResponseType {
	data?: responseType | string | AnyObject,
	statusCode?:number,
	header?: object
	cookies?: any,
	errMsg?: string,
	errno?: number
}

interface responseType<T = any> {
  data: T
  message: string | null
  code: number
}
