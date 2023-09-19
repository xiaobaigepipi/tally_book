interface requestOptionsType<T = any> {
	data?: T,
	method: 'GET' | 'POST',
	url: string,
	header?: object,
	timeout?: number,
	baseUrl?: string,
}

