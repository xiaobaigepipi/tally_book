module.exports = {
  // 这里给出了一份 uni-app /taro 通用示例，具体要根据你自己项目的目录进行配置
  // 注意，不在 content glob语法匹配的文件，不会生成工具类
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  // ... other options
  corePlugins: {
    // 不需要 preflight，因为preflight主要是给 h5 的，小程序使用的独特的标签，导致preflight不起作用。
    // 如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false
  },
	prefix: 'tw-',
	theme: {
		extend: {
			colors: {
				'green': '#389e0d',
				'red': '#f5222d',
				'red-deep': '#F56C6C',
				'bg-gray':  '#eeeeee'
			}
		}
	}
}
