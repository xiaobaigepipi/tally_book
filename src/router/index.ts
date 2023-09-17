export default function initRouter() {
	const whiteList: string[] = ["/pages/login/index"];
	const routeTypes: string[] = [
		"navigateTo",
		"redirectTo",
		"reLaunch",
		"switchTab",
	];

	console.log('初始化路由拦截')
	const token = uni.getStorageSync('token');
	if (!token) {
		// #ifdef H5
			//uni.navigateTo({ url: '/pages/login/index' })
		// #endif

		// #ifdef MP-WEIXIN
		console.log('微信小程序')
		// #endif
	}

	routeTypes.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				console.log("url:", e)
				const url = e.url.split('?')[0];

				if (whiteList.includes(url)) {
					return e;
				} else {
					if (token) {
						return e
					} else {
						// #ifdef H5
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						//uni.navigateTo({ url: '/pages/login/index' })
						// #endif

						// #ifdef MP-WEIXIN
						console.log('微信小程序')
						// #endif
						
						return true
					}
				}
			},
			fail(err) {
				console.log(err)
			}
		})
	})
}
