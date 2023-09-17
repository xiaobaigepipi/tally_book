<template>
	<tm-navbar title="首页" :followTheme="false" hideHome>
		<view class="tw-flex tw-justify-center tw-items-center">
			<tm-text>{{ currentDate }}</tm-text>
			<tm-icon class="tw-ml-1" name="tmicon-angle-down" :fontSize="24"></tm-icon>
		</view>
		<template v-slot:left>
			<tm-icon _class="px-32" name="tmicon-calendaralt-fill"></tm-icon>
		</template>
	</tm-navbar>
	<view class="tw-h-[280rpx] tw-m-[18rpx] tw-rounded tw-text-white tw-relative">
		<image
			src="/static/home-back.jpg"
			mode="scaleToFill"
			class="tw-z-0 tw-absolute tw-left-0 tw-bottom-0 tw-top-0 tw-right-0 tw-w-full tw-h-[280rpx] tw-rounded"
		/>
		<view class="tw-flex tw-justify-between tw-p-4 tw-pt-6 tw-items-center tw-relative">
			<view>
				<view class="tw-text-xs"> 月结余 </view>
				<view class="tw-text-lg tw-font-bold"> 6728.90 </view>
			</view>
			<view>
				<tm-button color="#ffffff" :margin="[10]" size="small" :shadow="0" :round="20" :width="140">默认账本</tm-button>
			</view>
		</view>
		<view class="tw-flex tw-justify-start tw-pl-4 tw-pt-6 tw-pr-4 tw-justify-items-center tw-relative">
			<view class="tw-text-sm"> 月收入：12830.83 </view>
			<view class="tw-text-sm tw-ml-3"> 月支出：6728.90 </view>
		</view>
	</view>
	<tm-sheet :margin="[18, 18]" :round="2" v-for="(item, index) in dataList" :key="index">
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
			<tm-text class="tw-font-bold">{{ item.date }}</tm-text>
			<tm-text class="tw-font-bold">{{ handleSumData(item.children) }}</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>

		<view v-for="(secondItem, secondIndex) in item.children" :key="secondIndex">
			<view class="tw-flex tw-justify-between tw-items-center">
				<view class="flex tw-justify-start tw-items-center">
					<view
						class="tw-bg-green tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
						v-if="secondItem.amountType === 0"
					></view>
					<view
						class="tw-bg-red tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
						v-if="secondItem.amountType === 1"
					></view>
					<tm-text class="">{{ secondItem.type }}</tm-text>
				</view>
				<view class="tw-text-green tw-text-sm" v-if="secondItem.amountType === 0"
					>-{{ secondItem.amount.toFixed(2) }}</view
				>
				<view class="tw-text-red tw-text-sm" v-if="secondItem.amountType === 1"
					>+{{ secondItem.amount.toFixed(2) }}</view
				>
			</view>
			<view class="tw-h-2" v-if="secondIndex < item.children.length - 1"></view>
		</view>
	</tm-sheet>
</template>

<script setup lang="ts">
import tmButton from '@/tmui/components/tm-button/tm-button.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import tmNavbar from '@/tmui/components/tm-navbar/tm-navbar.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
import { ref } from 'vue'

const currentDate = ref<string>('2023-09')
const dataList = ref<Array<any>>([
	{
		date: '09.17 周日',
		children: [
			{
				amount: 50.49,
				amountType: 0,
				type: '三餐',
			},
			{
				amount: 20.58,
				amountType: 0,
				type: '三餐',
			},
		],
	},
	{
		date: '09.15 周六',
		children: [
			{
				amount: 400.0,
				amountType: 1,
				type: '奖金',
			},
			{
				amount: 20.23,
				amountType: 0,
				type: '交通',
			},
		],
	},
	{
		date: '09.13 周四',
		children: [
			{
				amount: 400.0,
				amountType: 1,
				type: '奖金',
			},
			{
				amount: 20.23,
				amountType: 0,
				type: '交通',
			},
		],
	},
	{
		date: '09.12 周三',
		children: [
			{
				amount: 400.0,
				amountType: 1,
				type: '奖金',
			},
			{
				amount: 20.23,
				amountType: 0,
				type: '交通',
			},
		],
	},
	{
		date: '09.09 周日',
		children: [
			{
				amount: 400.0,
				amountType: 1,
				type: '奖金',
			},
			{
				amount: 20.23,
				amountType: 0,
				type: '交通',
			},
		],
	},
])

const handleSumData = (list: any) => {
	let sum: number = 0
	list.forEach((item: any) => {
		item.amountType === 1 ? (sum += item.amount) : (sum -= item.amount)
	})
	if (sum > 0) {
		return '收 ' + sum.toFixed(2)
	} else if (sum < 0) {
		return ('支 ' + sum.toFixed(2)).replace('-', '')
	} else {
		return '平 ' + sum.toFixed(2)
	}
}
</script>

<style lang="scss" scoped></style>
