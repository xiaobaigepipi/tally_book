import { request } from '../request'

export const testRequest = () => {
	return request({
		url: '/mock/test',
		method: 'GET'
	})
}
