<template>
	<tm-app>
		<tm-navbar title="日历视图" :followTheme="false" hideHome> </tm-navbar>
		<tm-sheet :round="5" :margin="[32, 32]" >
			<view class=" tw-flex tw-justify-around">
				<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text :fontSize="24" _class="text-gray">月收入</tm-text>
						<tm-text :fontSize="28"  class="tw-font-bold tw-mt-[10rpx]"> ￥6728.90 </tm-text>
				</view>
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text :fontSize="24" _class="text-gray">月支出</tm-text>
					<tm-text :fontSize="28"  class="tw-mt-[10rpx] tw-font-bold"> ￥728.90 
					</tm-text>
				</view>
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text :fontSize="24" _class="text-gray">月结余</tm-text>
					<tm-text :fontSize="28"  class="tw-mt-[10rpx] tw-font-bold"> ￥728.90 
					</tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :round="5" :margin="[32, 0]" >
			<tm-calendar-view @click="handleClick" :defaultValue="date" :dateStyle="dateStyle" hideButton format="YYYY-MM-DD"></tm-calendar-view>
		</tm-sheet>

		<tm-sheet :round="5" :margin="[32, 32]" :padding="[32, 32, 32, 20]" v-if="selectData?.date">
			<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
				<tm-text class="tw-font-bold">{{ selectData.date }}</tm-text>
				<tm-text class="tw-font-bold">{{ selectData.amount }}</tm-text>
			</view>
			<tm-divider align="center"></tm-divider>
			<view v-for="(secondItem, secondIndex) in selectData.children" :key="secondIndex">
				<view class="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<view class="flex tw-justify-start tw-items-center">
						<view
							class="tw-bg-green tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
							v-if="secondItem.amountType === 0"
						></view>
						<view
							class="tw-bg-red tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
							v-if="secondItem.amountType === 1"
						></view>
						<view>
							<tm-text class="">{{ secondItem.type }}</tm-text>
							<tm-text :font-size="20" _class="text-gray">测试测试</tm-text>
						</view>
					</view>
					<view class="tw-text-green tw-text-sm" v-if="secondItem.amountType === 0"
						>-{{ secondItem?.amount?.toFixed(2) }}</view
					>
					<view class="tw-text-red tw-text-sm" v-if="secondItem.amountType === 1"
						>+{{ secondItem.amount?.toFixed(2) }}</view
					>
				</view>
			</view>
		</tm-sheet>
	</tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import tmCalendarView from "@/tmui/components/tm-calendar-view/tm-calendar-view.vue";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
import isoWeek from "@/tmui/tool/dayjs/esm/plugin/isoWeek/index"
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
const DayJs = dayjs.default;
DayJs.extend(isoWeek);

const date = ref([DayJs(new Date()).format('YYYY-MM-DD')]);

interface selectType {
	date?: string
	amount?: number
	children?: Array<any>
}

const selectData = ref<selectType>({});


const dateStyle = ref([
	{
		date: '2023-09-08', //日期
		text: false, //浅色背景。
		color: '#FF5722', //主题色.
		extra: '12333' //额外的内容，在日期下方显示的文本。
	},
	{
		date: '2023-09-24', //日期
		text: false, //浅色背景。
		color: '#4ec752', //主题色.
		extra: '123' //额外的内容，在日期下方显示的文本。
	}
])

const handleClick = (val: string) => {
	selectData.value = {}
	dateStyle.value?.forEach((item : any) => {
		if (item.date === val) {
			selectData.value = {
				date: item.date,
				amount: item.extra,
				children: [
					{
						amountType: 1,
						amount: 223.33,
						type: '三餐'
					},
					{
						amountType: 1,
						amount: 223.33,
						type: '三餐'
					}
				]
			};
		}
	})
}
</script>

<style lang="scss" scoped>
</style>
