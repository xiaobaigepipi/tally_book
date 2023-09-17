
const config = {
	baseUrl: '/api',
	timeout: 1000,
	header: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
}
let loadNumber: number = 0;

const showLoading = () => {
	uni.showLoading({
		title: '加载中'
	})
}

const hideLoading = () => {
	if (loadNumber <= 0) {
		setTimeout(() => {
			uni.hideLoading()
		}, 300)
	}
}
const beforeRequest = (opions: requestOptionsType): Promise<requestOptionsType> => {
	return new Promise((resolve, reject) => {
		const  allOptions: requestOptionsType = {
			...opions,
			url: config.baseUrl + opions.url,
			timeout: config.timeout,
			header: {
				...config.header,
				...opions.header
			}
		}

		const token = uni.getStorageSync('token')
		if (token) {
			allOptions.header = {
				token: token
			}
		}
		if (!opions.url) {
			reject('error')
		}
		console.log('request:', allOptions)
		showLoading();
		loadNumber++;
		resolve(allOptions)
	})
}

const afterRequest = (res: uniResponseType) => {
	console.log('response:', res)
	return new Promise((resolve, reject) => {
		loadNumber--;
		hideLoading();
		if (res.statusCode == 200) {
			resolve(res.data as responseType)
		} else {
			reject('出错了')
		}
	})
}

export const request = (options: requestOptionsType) => {
	return beforeRequest(options).then((alls: requestOptionsType) => {
		return uni.request(alls)
	}).then((res: uniResponseType) =>{
		return afterRequest(res)
	}).catch(error => {
		return afterRequest(error)
	})
}
