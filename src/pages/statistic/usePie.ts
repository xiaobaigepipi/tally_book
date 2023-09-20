import { ECharts } from "echarts"
import { ref } from "vue";

interface pieType {
	name?: string
	value: number
	itemStyle?: { color? : string}
}

const data = ref<Array<pieType>>(
	[
		{ name: '圣彼得', value: 0.6, itemStyle: {} },
		{ name: '陀思妥耶夫', value: 1, itemStyle: {} },
		{ name: '史记精注', value: 0.8, itemStyle: {}},
		{ name: '加德纳艺术', value: 0.5, itemStyle: {} },
		{ name: '表象与本质', value: 0.5, itemStyle: {} },
		{ name: '其它', value: 0.8, itemStyle: {} },
		{ name: '加德纳', value: 0.5, itemStyle: {} },
		{ name: '表象', value: 0.5, itemStyle: {} },
		{ name: '其它2', value: 0.8, itemStyle: {} }
	]
)

const usePie = () => {
	const pieConfig = ref(defaultConfig);
	const pieData = ref<Array<pieType>>();

	async function chartInit(chart: ECharts) {
		const func = new Promise((resolve) => {
			setTimeout(() => {
				resolve(changeColorData(data))
			}, 200)
		})

		pieData.value = (await func) as Array<pieType>
		// console.log(pieData.value)
		pieConfig.value.series[0].data = pieData.value
		chart.setOption(pieConfig.value)
	}

	const changeColorData = (data: any) => {
		const list: Array<pieType> = [];
		if (data.value && data.value.length > 0) {
			data.value.forEach((item: any)=> {
				item.itemStyle = {
					color: insertColor(),
				};
				list.push(item)
			});
		}

		return list;
	}

	return {
		chartInit,
		pieData
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
		text: '总共\n3403',
		left: 'center',
		top: 'center',
		textStyle: {
			fontSize: 14,
			lineHeight: 16,
		},
	},
	series: [
		{
			name: '',
			type: 'pie',
			radius: ['40%', '80%'],
			center: ['50%', '50%'],
			label: {
				alignTo: 'labelLine',
				formatter: '{name|{b}}\n{time|{c}}',
				minMargin: 5,
				edgeDistance: 10,
				lineHeight: 15,
				position: 'outside',
				rich: {
					time: {
						fontSize: 8,
						color: '#999',
					},
					name: {
						fontSize: 8,
						color: '#999',
					},
				},
			},
			labelLine: {
				show: true,
				length: 10,
				length2: 10,
				maxSurfaceAngle: 80,
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
