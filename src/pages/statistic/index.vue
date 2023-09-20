<template>
	<tm-app>
		<view class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50" :style="{'height': safeTop*2 + 180 + 'rpx'}">
			<tm-sheet  :margin="[0, 0]" :padding="[0,0]" :color="isDark?'#000000':color" :linear="isDark?'':'top'">
				<view :style="{'height':safeTop  + 'px'}"></view>
				<view class=" tw-px-[32rpx] tw-py-[20rpx]">
					<tm-text :font-size="36">我的账本</tm-text>
					<view class=" tw-flex tw-justify-between tw-items-center tw-pt-[30rpx]  tw-pb-[10rpx]">
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
			<tm-sheet :height="210" :margin="[0, 0]" :padding="[30,30]" :round="3">
				<view class=" tw-flex tw-justify-around tw-items-end">
					<view class="tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray" :font-size="24">收入</tm-text>
						<tm-text :font-size="38" _class="tw-font-bold tw-mt-1  text-red">￥7192.20</tm-text>
					</view>
					<view class="tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray" :font-size="24">支出</tm-text>
						<tm-text :font-size="38" _class="tw-font-bold text-green tw-mt-1 ">￥2192.20</tm-text>
					</view>
				</view>
				<view class=" tw-flex tw-justify-between tw-items-center tw-mt-[30rpx]">
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray" :font-size="24">结余</tm-text>
						<tm-text _class="tw-mt-1 tw-font-bold">￥3192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray" :font-size="24">日均支出</tm-text>
						<tm-text _class="tw-mt-1 tw-font-bold">￥192.20</tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text _class="text-gray" :font-size="24">不计收支</tm-text>
						<tm-text _class="tw-mt-1 tw-font-bold">￥292.20</tm-text>
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
				<view v-for="(item, index) in pieData" :key="index">
					<view class=" tw-flex tw-justify-start tw-items-center tw-py-1">
						<view>
							<view class="tw-flex tw-justify-between tw-items-center">
								<tm-text :font-size="24">{{ item.name }}</tm-text>
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


const chartDom = ref<InstanceType<typeof tmChart>>();
const { chartInit, pieData } = usePie()

// console.log(dataList.value)
</script>

<style lang="scss" scoped></style>
