<template>
	<tm-sheet
		:text="false"
		:margin="[0, 0]"
		:padding="[50, 0]"
		:followTheme="false"
	>
		<view class="tw-h-[320rpx]">
			<image
				src="/static/home-back.jpg"
				mode="scaleToFill"
				class="tw-z-0 tw-absolute tw-left-0 tw-bottom-0 tw-top-0 tw-right-0 tw-w-full tw-h-[320rpx] tw-rounded"
				:class="{'image-dark': isDark}"
			/>
			<view :style="{'height': (safeTop>=47?safeTop:safeTop>0?47:0) + 'px'}"></view>
			<view class="tw-flex tw-justify-start tw-items-center tw-relative tw-z-10 tw-pt-[30rpx] tw-pb-[30rpx]">
				<tm-text color="white" :fontSize="36">默认账本</tm-text>
				<tm-icon :followTheme="false" color="white" class="tw-ml-1 tw-mt-[5rpx]" name="tmicon-waiting-fill" :fontSize="34"></tm-icon>
			</view>
			<view class="tw-z-10 tw-relative tw-flex tw-justify-between">
				<view class="tw-flex tw-justify-center tw-items-center">
					<tm-text color="white">{{ currentDate }}</tm-text>
					<tm-icon :followTheme="false" color="white" class="tw-ml-1" name="tmicon-angle-down" :fontSize="24"></tm-icon>
				</view>
				<view class="tw-flex tw-justify-center tw-items-center">
					<tm-text color="white">日历模式</tm-text>
					<tm-icon :followTheme="false" color="white" class="tw-ml-1" name="tmicon-calendaralt-fill" :fontSize="28"></tm-icon>
				</view>
			</view>
		</view>
	</tm-sheet>

	<!-- #ifdef MP-WEIXIN -->
	<view class=" tw-mt-[-90rpx]"></view>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<view class=" tw-mt-[-180rpx]"></view>
	<!-- #endif -->

	<view class=" tw-relative tw-z-40">
		<tm-sheet :margin="[32, 24]" :padding="[50,30]" :round="5" :shadow="10">
			<view>
				<view class=" tw-flex tw-justify-start tw-items-center">
					<tm-text :fontSize="24" _class="text-gray"> 月结余 </tm-text>
					<tm-text :fontSize="36" :color="primaryColor" class="tw-font-bold tw-ml-[10rpx]"> ￥6728.90 
					</tm-text>
				</view>
				<view class="tw-flex tw-justify-between tw-items-center tw-mt-[30rpx]">
					<view class="tw">
						<tm-text :fontSize="24" _class="text-gray"> 月收入</tm-text>
						<tm-text :fontSize="28" _class="text-red tw-mt-[10rpx]"> ￥12830.83 </tm-text>
					</view>
					<view>
						<tm-text :fontSize="24"  _class="text-gray"> 月支出 </tm-text>
						<tm-text :fontSize="28"  _class="text-green tw-mt-[10rpx]"> ￥6728.90 </tm-text>
					</view>
					<view>
						<tm-text :fontSize="24" _class="text-gray"> 月预算 </tm-text>
						<tm-text :fontSize="28" _class="tw-mt-[10rpx]" :color="primaryColor"> ￥6728.90 </tm-text>
					</view>
				</view>
			</view>
		</tm-sheet>
	</view>
	<tm-sheet :margin="[32, 24]" :round="5" v-for="(item, index) in dataList" :key="index">
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
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
import { computed, ref } from 'vue'
import { getThemeColor } from '@/utils/theme'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'

const currentDate = ref<string>('2023-09')
const primaryColor = computed<string>(() => getThemeColor())
defineProps({
	safeTop: {
		type: Number,
		default: 0,
	},
})

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

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

const dataList = ref<Array<any>>([
	{
		date: '09/17 周日',
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
		date: '09/15 周六',
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
		date: '09/13 周四',
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
		date: '09/12 周三',
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
		date: '09/09 周日',
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
</script>

<style lang="scss" scoped>
</style>
