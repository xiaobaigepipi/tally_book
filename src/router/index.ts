export default function initRouter() {
	const whiteList: string[] = ["/pages/login/index"];
	const routeTypes: string[] = [
		"navigateTo",
		"redirectTo",
		"reLaunch",
		"switchTab",
	];

	console.log('初始化路由拦截')
	const initToken = uni.getStorageSync('token');
	if (!initToken) {
		uni.navigateTo({ url: '/pages/login/index'})
	}

	routeTypes.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				console.log("url:", e)
				const url = e.url.split('?')[0];

				if (whiteList.includes(url)) {
					return e;
				} else {
					const token = uni.getStorageSync('token');
					if (token) {
						return e
					} else {

						uni.showToast({
							title: '请先登录',
							icon: 'error'
						})
						uni.navigateTo({ url: '/pages/login/index' })
						
						return false
					}
				}
			},
			fail(err) {
				console.log(err)
			}
		})
	})
}
