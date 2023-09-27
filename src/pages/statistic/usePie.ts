
const usePie = () => {

	return {
		insertColor,
		defaultConfig
	}
}

export default usePie;

/**
 * 随机颜色生成
 */
const insertColor = () => {
	const color = ['a','b','c','d','e','f','A','B','C','D','E','0','1','2','3','4','5','6','7','8','9']
	// 三位和六位，都是有用的二进制颜色  设置type为奇数就是3，偶数就是6位
	const type = ~~(Math.random() * 10 + 1)
	// 循环的长度
	const len = type % 2 == 0 ? 3 : 6 
	// 存放结果
	let ans = ''
	for(let i = 0; i < len;i++) {
			//这里循环随机得到数组下标
			const index = ~~(Math.random() * color.length)
			ans += color[index]
	}
	return '#' + ans
}

const defaultConfig: any = {
	title: {
		text: '',
		left: 'center',
		top: 'center',
		textStyle: {
			fontSize: 14,
			lineHeight: 16,
		},
	},
	tooltip: {
    trigger: 'item',
    formatter: function (d: any) {
			return d.name + ' ' + Math.round(d.percent) + '%'
		},
  },
	series: [
		{
			type: 'pie',
			radius: ['30%', '60%'],
			center: ['50%', '50%'],
			emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
			label: {
				formatter: function (d: any) {
					return d.name + ' ' + Math.round(d.percent) + '%'
				},
				padding: [0, -10 ], 
				fontSize: 10,
			},
			labelLine:{
				show: true,
				length: 15, //调整上下位置
			},
			data: [
				{ name: '圣彼得', value: 0.6, itemStyle: {} },
				{ name: '陀思妥耶夫', value: 1, itemStyle: {} },
				{ name: '史记精注', value: 0.8, itemStyle: {}},
				{ name: '加德纳艺术', value: 0.5, itemStyle: {} },
				{ name: '表象与本质', value: 0.5, itemStyle: {} },
				{ name: '其它', value: 0.8, itemStyle: {} },
				{ name: '加德纳', value: 0.5, itemStyle: {} },
				{ name: '表象', value: 0.5, itemStyle: {} },
				{ name: '其它2', value: 0.8, itemStyle: {} }
			],
		},
	],
}
