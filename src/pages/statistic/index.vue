<template>
	<tm-app>
		<view class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50" :style="{'height': safeTop*2 + 175 + 'rpx'}">
			<tm-sheet :height="175 + safeTop*2" :margin="[0, 0]" :padding="[0,0]" :color="isDark?'#000000':color" :linear="isDark?'':'top'">
				<view :style="{'height':safeTop  + 'px'}"></view>
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
		<view :style="{'height': safeTop + 90 + 'px'}"></view>
		<view class=" tw-p-[32rpx]">
			<tm-sheet :height="160" :margin="[0, 0]" :padding="[30,30]" :round="3">
				<view class=" tw-flex tw-justify-start tw-items-end">
					<tm-text _class="text-gray">结余</tm-text>
					<view class=" tw-ml-1">
						<tm-text :font-size="38" _class="tw-font-bold">￥7192.20</tm-text>
					</view>
				</view>
				<view class=" tw-flex tw-justify-between tw-items-center tw-mt-[30rpx]">
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray">收入</tm-text>
						<tm-text _class="tw-mt-1 text-red tw-font-bold">￥7192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray">支出</tm-text>
						<tm-text _class="tw-mt-1 text-green tw-font-bold">￥7192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray">日均支出</tm-text>
						<tm-text _class="tw-mt-1 tw-font-bold">￥7192.20</tm-text>
					</view>
				</view>
			</tm-sheet>
		</view>
		<tm-sheet :margin="[32, 0]" :padding="[0,30]" :round="3">
			<view class="tw-flex tw-justify-center">
				<tm-text :font-size="28" _class="tw-font-bold">分类统计</tm-text>
			</view>
			<view class=" tw-flex tw-justify-center tw-pt-2 tw-z-1 tw-relative">
				<tm-chart ref="chartDom" :width="660"  :height="400" @onInit="chartInit"></tm-chart>
			</view>
			<view class=" tw-px-5 tw-pt-5">
				<view v-for="(item, index) in dataList" :key="index">
					<view class=" tw-flex tw-justify-start tw-items-center tw-py-1">
						<!-- <view class=" tw-mr-2">
							<tm-button
								:color="item?.itemStyle?.color"
								icon="tmicon-account"
								:width="70"
								:round="20"
								:height="70"
								:fontSize="40"
								:margin="[0, 8]"
								:shadow="0"
							></tm-button>
						</view> -->
						<view>
							<view class="tw-flex tw-justify-between tw-items-center">
								<tm-text>{{ item.name }}</tm-text>
								<tm-text>{{ item.value }}</tm-text>
							</view>
							<tm-progress :width="600" :height="16" followTheme="false" :percent="item.value*100" :color="item?.itemStyle?.color" show-bar></tm-progress>
						</view>
					</view>
				</view>
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
import TmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmChart from "@/tmui/components/tm-chart/tm-chart.vue";
import usePie from './usePie'
import tmProgress from "@/tmui/components/tm-progress/tm-progress.vue";
// import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

const color = computed(() => {
	return getThemeColor()
})
const list = ref([
	{ text: '月', id: '1' },
	{ text: '年', id: '2' }
])

defineProps({
	safeTop: {
		type: Number,
		default: 0
	}
})
interface pieType {
	name?: string
	value: number
	itemStyle?: { color? : string}
}
const dataList = ref<Array<pieType>>(
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

const chartDom = ref<InstanceType<typeof tmChart>>();
const { chartInit } = usePie(dataList)

console.log(dataList.value)
</script>

<style lang="scss" scoped></style>
