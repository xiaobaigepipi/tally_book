
const useBar = () => {
	return {
		defaultConfig
	}
}

export default useBar;

const defaultConfig = {
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
		'15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28',
		'29', '30', '31'
		],
		axisLabel: {
			color: '#999',
			fontSize: 10//调整坐标轴字体大小
		},
		axisTick: {
			show: false,
		} 
  },
	grid: {
		top: 20,
		bottom:20,
		left: 40,
		right: 0
	},
  yAxis: {
    type: 'value',
		axisLabel: {
			color: '#999',
			fontSize: 10//调整坐标轴字体大小
		},
		splitLine: { //坐标轴虚线
      show: true,
      lineStyle: {
				type: 'dashed',
				// color: '#999'
      },
		},
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 600, 120, 200, 150, 80, 70, 110, 1000, 120, 200, 150, 80, 70, 110, 1000,120, 200, 150, 80, 70, 110, 300],
      type: 'bar',
			label: {
				show: false,
				position: 'top',
				fontSize: 5,
			},
			itemStyle: {
				color: '#389e0d',
				borderRadius: [3, 3, 0, 0]
      },
			barWidth: 7,
    },
		// {
    //   data: [10, 320, 120, 20, 40, 120, 800],
    //   type: 'bar',
		// 	label: {
		// 		show: true,
		// 		position: 'top',
		// 		fontSize: 8,
		// 	},
		// 	itemStyle: {
		// 		color: '#4ec752'
    //   },
		// 	barWidth: 5,
    // },
		
  ]
};
