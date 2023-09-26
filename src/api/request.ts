
const config = {
	baseUrl: '/api',
	timeout: 10000,
	header: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
}

// #ifdef MP-WEIXIN
config.baseUrl = 'http://localhost:8787/api'
// #endif

let loadNumber: number = 0;

const showLoading = () => {
	uni.showLoading({
		title: '加载中'
	})
}

const hideLoading = () => {
	if (loadNumber <= 0) {
		uni.hideLoading()
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
				Authorization: token
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

const afterRequest = <T>(res: any): Promise<responseType<T>> => {
	console.log('response:', res)
	return new Promise((resolve, reject) => {
		loadNumber--;
		hideLoading();
		if (res.statusCode == 200) {
			if (res.data.code === 0) {
				resolve(res.data as responseType<T>)
			} else {
				uni.showToast({
					title: res.data.message || "服务器错误",
					icon: 'none',
					duration: 3000
				})
				// 登录状态失效
				if (res.data.code === 1005) {
					console.log(123)
					uni.navigateTo({ url: '/pages/login/index' })
				} else {
					// reject(res.data.message)
				}
			}
		} else {
			uni.showToast({
				title: res.errMsg || '数据获取失败',
				icon: 'none',
				duration: 5000
			})
			reject(res)
		}
	})
}

export const request = <T>(options: requestOptionsType): Promise<responseType<T>> => {
	return beforeRequest(options).then((alls: requestOptionsType) => {
		return uni.request(alls)
	}).then((res) =>{
		return afterRequest<T>(res)
	}).catch(error => {
		loadNumber--;
		hideLoading();
		uni.showToast({
			title: '服务器报错',
			icon: 'none',
			duration: 5000
		})
		return Promise.reject(error)
	})
}
