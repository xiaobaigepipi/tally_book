<template>
	<tm-sheet
		:text="false"
		:margin="[0, 0]"
		:padding="[0, 0]"
		:followTheme="false"
	>
		<view class="tw-h-[320rpx] tw-px-[50rpx]">
			<image
				src="/static/home-back.jpg"
				mode="scaleToFill"
				class="tw-z-0 tw-absolute tw-left-0 tw-bottom-0 tw-top-0 tw-right-0 tw-w-full tw-h-[320rpx] tw-rounded"
				:class="{'image-dark': isDark}"
			/>
			<view :style="{'height': safeTop + 'px'}"></view>
			<view class="tw-flex tw-justify-start tw-items-center tw-relative tw-z-10 tw-pt-[30rpx] tw-pb-[30rpx]" @click="toLedger">
				<tm-text color="white" :fontSize="36">{{ defaultLedger?.name }}</tm-text>
				<tm-icon :followTheme="false" color="white" class="tw-ml-1 tw-mt-[5rpx]" name="tmicon-waiting-fill" :fontSize="34"></tm-icon>
			</view>
			<view class="tw-z-10 tw-relative tw-flex tw-justify-between">
				<view class="tw-flex tw-justify-center tw-items-center" @click="showDate = true">
					<tm-text color="white">{{ dateModel.substring(0, 7).replace('/', '-') }}</tm-text>
					<tm-icon :followTheme="false" color="white" class="tw-ml-1" name="tmicon-angle-down" :fontSize="24"></tm-icon>
				</view>
				<view class="tw-flex tw-justify-center tw-items-center" @click="toCalendarPage">
					<tm-text color="white">日历视图</tm-text>
					<tm-icon :followTheme="false" color="white" class="tw-ml-1" name="tmicon-calendaralt-fill" :fontSize="28"></tm-icon>
				</view>
			</view>
		</view>
	</tm-sheet>

	<view :style="{'margin-top': -(-safeTop + 95) + 'px'}"></view>
	<view class=" tw-relative tw-z-40">
		<tm-sheet :margin="[32, 24]" :padding="[30,30]" :round="5" :shadow="10">
			<view>
				<view class="tw-flex tw-justify-around tw-items-center">
					<view class="tw-flex tw-flex-col tw-items-center">
						<tm-text :fontSize="24" _class="text-gray">结余</tm-text>
						<tm-text :fontSize="32" _class="tw-mt-[10rpx] tw-font-bold"> ￥{{ allPayIncome?.surplus }} </tm-text>
					</view>
					<!-- <view class="tw-flex tw-flex-col tw-items-center">
						<view class="tw-flex tw-flex-row tw-items-center">
							<tm-text :fontSize="24" _class="text-gray">月预算</tm-text>
							<tm-icon name="tmicon-edit" _class="text-gray tw-ml-1" :font-size="30"></tm-icon>
						</view>
						<tm-text :fontSize="32" _class="tw-font-bold tw-mt-[10rpx]"> ￥6728.90 </tm-text>
					</view> -->
				</view>
				<view class=" tw-flex tw-justify-around tw-mt-[30rpx]">
					<view class=" tw-flex tw-flex-col tw-items-center">
							<tm-text :fontSize="24" _class="text-gray">月收入</tm-text>
							<tm-text :fontSize="32"  class="tw-font-bold tw-mt-[10rpx]"> ￥{{ allPayIncome?.incomeSum }} </tm-text>
					</view>
					<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text :fontSize="24" _class="text-gray">月支出</tm-text>
						<tm-text :fontSize="32"  class="tw-mt-[10rpx] tw-font-bold"> ￥{{ Math.abs(allPayIncome?.paySum as number) || 0}}</tm-text>
					</view>
				</view>
			</view>
		</tm-sheet>
	</view>
	<tm-sheet :margin="[32, 24]" :round="5">
		<view>
			<view class=" tw-flex tw-justify-center">
				<tm-segtab @change="changeChart" :round="24" :gutter="4" :height="50" :width="200" :color="color" activeColor="white" :font-size="24" :list="list" defaultValue="1"></tm-segtab>
			</view>
			<view class=" tw-flex tw-justify-center">
				<tm-chart ref="chartDom" :width="660"  :height="400"></tm-chart>
			</view>
		</view>
	</tm-sheet>
	<tm-sheet :margin="[32, 24]" :round="5" v-for="(item, index) in allPayIncome?.children" :key="index">
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
			<tm-text class="tw-font-bold">{{ item.payDate?.substring(5, 10).replace('-', '/') }}</tm-text>
			<tm-text class="tw-font-bold">{{ handleSumData(item.children) }}</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>

		<view v-for="(secondItem, secondIndex) in item.children" :key="secondIndex">
			<view class="tw-flex tw-justify-between tw-items-center tw-mb-[16rpx]">
				<view class="flex tw-justify-start tw-items-center">
					<view
						class="tw-bg-green tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
						v-if="secondItem.amount as number <  0"
					></view>
					<view
						class="tw-bg-red tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
						v-if="secondItem.amount as number >=0"
					></view>
					<view>
						<tm-text class="">{{ secondItem.payTypeName }}</tm-text>
						<tm-text :font-size="20" _class="text-gray">{{ secondItem.remark }}</tm-text>
					</view>
				</view>
				<view class="tw-text-green tw-text-sm" v-if="secondItem.amount as number < 0"
					>{{  secondItem.amount }}</view
				>
				<view class="tw-text-red tw-text-sm" v-if="secondItem.amount as number >=0"
					>+{{ secondItem.amount }}</view
				>
			</view>
		</view>
	</tm-sheet>
	<tm-time-picker
		:showDetail="{
			year: true,
			month: true,
			day:false,
		}"
		v-model="dateModel"
		v-model:show="showDate"
		format="YYYY-MM-DD HH:mm:ss"
		@confirm="changeDateSelect"
		>
		</tm-time-picker>
</template>

<script setup lang="ts">
import tmTimePicker from '@/tmui/components/tm-time-picker/tm-time-picker.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
import { computed, ref } from 'vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import tmSegtab from '@/tmui/components/tm-segtab/tm-segtab.vue'
import tmChart from '@/tmui/components/tm-chart/tm-chart.vue'
import useBar from './useBar'
import { getPayIncomeList } from '@/api/payIncome/index'
import { payIncomAllType, payIncomeType} from '@/types/user'
import { getThemeColor, getColorByName } from "@/utils/theme";
import { useDefaultLedger } from '@/pages/hooks/useDefaultLedger'
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
import isoWeek from "@/tmui/tool/dayjs/esm/plugin/isoWeek/index"
import { onLoad } from '@dcloudio/uni-app'

const chartDom = ref<InstanceType<typeof tmChart>>();

const DayJs = dayjs.default;
DayJs.extend(isoWeek);
const { defaultLedger } = useDefaultLedger()

const color = computed(() => {
	return getThemeColor()
})
defineProps({
	safeTop: {
		type: Number,
		default: 0,
	},
})
const showDate = ref<boolean>(false);
const dateModel = ref<string>(DayJs(new Date()).format('YYYY/MM'));
const changeDateSelect = (date: any) => {
	dateModel.value = date
	init();
}

const list = ref([
	{ text: '支出', id: '1' },
	{ text: '收入', id: '2' },
])

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

const handleSumData = (list: any) => {
	let sum: number = 0
	list.forEach((item: any) => {
		sum += item.amount
	})
	if (sum > 0) {
		return '收 ' + sum.toFixed(2)
	} else if (sum < 0) {
		return ('支 ' + sum.toFixed(2)).replace('-', '')
	} else {
		return '平 ' + sum.toFixed(2)
	}
}
const toCalendarPage = () => {
	uni.navigateTo({
		url: '/pages/calendar/index'
	})
}

const toLedger = () => {
	uni.navigateTo({
		url: '/pages/ledger/index'
	})
}

const allPayIncome = ref<payIncomAllType>()
const { defaultConfig }  = useBar();

const init = () => {
	getPayIncomeList({payDate: DayJs(dateModel.value).format('YYYY-MM-DD HH:mm:ss')}).then( res => {
		allPayIncome.value = res.data;
		setChart(res.data?.children, '1', 'green')
	})
}

const setChart = (list: Array<payIncomeType> | undefined, type: string, color: string) => {
	const config = handleChartData(list, type);
	defaultConfig.series[0].data = config.y.reverse()
	defaultConfig.xAxis.data = config.x.reverse()
	defaultConfig.series[0].itemStyle.color = getColorByName(color)
	chartDom.value?.getChart().then((res:any) => {
		res.setOption(defaultConfig)
	})
}

const handleChartData = (list: Array<payIncomeType> | undefined, type: string) : any =>{
	const config: any = {
		x: [],
		y: []
	}
	if (list == undefined) {
		return config
	}

	const sumFunc = (list: any) => {
		let sum = 0;
		list.forEach((item: any) => {
			if (item.payIncome === type) {
				sum += Number(item.amount)
			}
		})
		return Math.abs(sum)
	}
	list.forEach(item => {
		config.x.push(item.payDate?.substring(8, 10))
		config.y.push(sumFunc(item.children))
	})
	return config
}

const changeChart = (val: any) => {
	setChart(allPayIncome.value?.children, val, val === '2'? 'red': 'green')
}

onLoad(() => {
	init()
})


</script>

<style lang="scss" scoped>
</style>
