import tmRowVue from "@/tmui/components/tm-row/tm-row.vue";
import { ECharts } from "echarts"
import { ref } from "vue";

const usePie = (data: any) => {
	const pieConfig = ref(defaultConfig);

	if (data.value && data.value.length > 0) {
		data.value.forEach((item: any)=> {
			item.itemStyle = {
				color: insertColor(),
			};
		});
	}
	pieConfig.value.series[0].data = data.value

	function chartInit(chart: ECharts) {

		chart.setOption(pieConfig.value)
		// setTimeout(() => {
		// 	chartDom.value?.getImg().then((e) => {
		// 		// 打印图表图片，记得要等动画结束再截取，这里只是演示，具体以你的情况为例做调整。
		// 		console.log(e)
		// 	})
		// }, 200)
	}

	return {
		pieConfig,
		chartInit
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

const defaultConfig = {
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
				show: tmRowVue,
				length: 10,
				length2: 10,
				maxSurfaceAngle: 80,
			},
			data: [],
		},
	],
}
