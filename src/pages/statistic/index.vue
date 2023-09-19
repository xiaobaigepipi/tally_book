<template>
	<tm-app>
		<view class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-h-[180rpx]">
			<tm-sheet :height="180" :margin="[0, 0]" :padding="[0,0]" :color="color" linear="top">
				<view :style="{'height': 0  + 'px'}"></view>
				<view class=" tw-px-[32rpx] tw-py-[20rpx]">
					<tm-text :font-size="36">我的账本</tm-text>
					<view class=" tw-flex tw-justify-between tw-items-center tw-pt-[30rpx]">
						<tm-segtab :list="list" :height="54" :round="24" :font-size="28" :gutter="4" :color="color" bgColor="white" activeColor="white" :width="200" default-value="1"></tm-segtab>
						<view class="tw-flex tw-justify-center tw-items-center">
							<tm-text>2023-09</tm-text>
							<tm-icon class="tw-ml-1" name="tmicon-angle-down" :fontSize="24"></tm-icon>
						</view>
					</view>
				</view>
			</tm-sheet>
		</view>
		<view class=" tw-h-[180rpx]"></view>
		<view class=" tw-p-[32rpx]">
			<tm-sheet :height="160" :margin="[0, 0]" :padding="[30,30]" :round="3">
				<view class=" tw-flex tw-justify-start tw-items-end">
					<tm-text>结余</tm-text>
					<view class=" tw-ml-1">
						<tm-text :font-size="38" _class="tw-font-bold">￥7192.20</tm-text>
					</view>
				</view>
				<view class=" tw-flex tw-justify-between tw-items-center tw-mt-[30rpx]">
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text>收入</tm-text>
						<tm-text _class="tw-mt-1 text-red tw-font-bold">￥7192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text>支出</tm-text>
						<tm-text _class="tw-mt-1 text-green tw-font-bold">￥7192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="">日均支出</tm-text>
						<tm-text _class="tw-mt-1 tw-font-bold">￥7192.20</tm-text>
					</view>
				</view>
			</tm-sheet>
		</view>
		<tm-sheet :margin="[32, 0]" :padding="[0,30]" :round="3">
			<view class="tw-flex tw-justify-center">
				<tm-text :font-size="30" _class="tw-font-bold">分类统计</tm-text>
			</view>
			<view class=" tw-flex tw-justify-center">
				<tm-chart ref="chartDom" :width="660"  :height="400" @onInit="chartInit"></tm-chart>
			</view>
		</tm-sheet>
	</tm-app>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmSegtab from "@/tmui/components/tm-segtab/tm-segtab.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";
import { getThemeColor } from "@/utils/theme";
import { ECharts } from "echarts";
import TmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmChart from "@/tmui/components/tm-chart/tm-chart.vue";

const color = computed(() => {
	return getThemeColor()
})
const list = ref([
	{ text: '月', id: '1' },
	{ text: '年', id: '2' }
])

const chartDom = ref<InstanceType<typeof tmChart>>();

function chartInit(chart: ECharts) {
	const option = {
	title: {
		text: '总共\n3403',
		left: 'center',
		top: 'center',
		textStyle: {
			fontSize: 14,
			lineHeight: 16,
		}
	},
  series: [
    {
			name: '姓名',
      type: 'pie',
      radius:  ['40%', '70%'],
      center: ['50%', '50%'],
			// emphasis: {
      //   itemStyle: {
      //     shadowBlur: 10,
      //     shadowOffsetX: 0,
      //     shadowColor: 'rgba(0, 0, 0, 0.5)'
      //   }
      // },
      // itemStyle: {
      //   borderColor: '#fff',
      //   borderWidth: 1
      // },
			// roseType: 'redius',
      label: {
        alignTo: 'labelLine',
        formatter: '{name|{b}}\n{time|￥{c}}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
				position: 'outside',
        rich: {
          time: {
            fontSize: 10,
            color: '#999'
          },
					name: {
            fontSize: 10,
            color: '#999'
          }
        }
      },
      labelLine: {
				show: true,
        length: 10,
        length2: 10,
        maxSurfaceAngle: 80
      },
      // labelLayout: function (params: any) {
      //   const isLeft = params.labelRect.x < chart.getWidth() / 3;
      //   const points = params.labelLinePoints;
      //   // Update the end point.
      //   points[2][0] = isLeft
      //     ? params.labelRect.x
      //     : params.labelRect.x + params.labelRect.width;
      //   return {
      //     labelLinePoints: points
      //   };
      // },
      data: [
				{ name: '三餐', value: 313.5 },
				{ name: '生活用品', value: 532.8 },
				{ name: '交通', value: 541.7 },
				{ name: '数码', value: 531.4 },
				{ name: '房租', value: 450.5 },
				{ name: '其它312', value: 233.8 },
				{ name: '交通3', value: 541.7 },
				{ name: '数码3', value: 531.4 },
				{ name: '房租3', value: 450.5 },
				{ name: '其它3', value: 533.8 }
      ]
    }
  ]
	};
	chart.setOption(option)
	// setTimeout(() => {
	// 	chartDom.value?.getImg().then((e) => {
	// 		// 打印图表图片，记得要等动画结束再截取，这里只是演示，具体以你的情况为例做调整。
	// 		console.log(e)
	// 	})
	// }, 200)
}
</script>

<style lang="scss" scoped></style>