<template>
	<tm-app>
		<view class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50" :style="{'height': safeTop*2 + 180 + 'rpx'}">
			<tm-sheet  :margin="[0, 0]" :padding="[0,0]" :color="isDark?'#000000':color" :linear="isDark?'':'top'">
				<view :style="{'height':safeTop  + 'px'}"></view>
				<view class=" tw-px-[32rpx] tw-py-[20rpx]">
					<tm-text :font-size="36">{{ ledger?.name }}</tm-text>
					<view class=" tw-flex tw-justify-between tw-items-center tw-pt-[30rpx]  tw-pb-[10rpx]">
						<tm-segtab v-model="tabVal" :list="list" @change="changeChart" :height="54"  :round="24" :font-size="28" :gutter="4" :color="color" bgColor="white" activeColor="white" :width="200" default-value="0"></tm-segtab>
						<view class="tw-flex tw-justify-center tw-items-center" @click="showDate = true">
							<tm-text color="white" :label="dateModel.substring(0, 7).replace('/', '-')"></tm-text>
							<tm-icon class="tw-ml-1" name="tmicon-angle-down" :fontSize="24"></tm-icon>
						</view>
					</view>
				</view>
			</tm-sheet>
		</view>
		<view :style="{'height': safeTop + 90 + 'px'}"></view>
		<tm-sheet :margin="[32, 32]" :padding="[30,30]" :round="5">
			<view class=" tw-flex tw-justify-around tw-items-end">
				<view class="tw-flex tw-flex-col tw-items-center">
					<tm-text _class="text-gray" :font-size="24">收入</tm-text>
					<tm-text :font-size="30" _class="tw-font-bold tw-mt-1  text-red" :label="allPayIncome?.incomeSum || 0"></tm-text>
				</view>
				<view class="tw-flex tw-flex-col tw-items-center">
					<tm-text _class="text-gray" :font-size="24">支出</tm-text>
					<tm-text :font-size="30" _class="tw-font-bold text-green tw-mt-1 " :label="Math.abs(allPayIncome?.paySum || 0)"></tm-text>
				</view>
			</view>
			<view class=" tw-flex tw-justify-around tw-items-center tw-mt-[30rpx]">
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text _class="text-gray" :font-size="24">结余</tm-text>
					<tm-text :font-size="30" _class="tw-mt-1 tw-font-bold" :label="allPayIncome?.surplus || 0"></tm-text>
				</view>
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text _class="text-gray" :font-size="24">日均支出</tm-text>
					<tm-text :font-size="30" _class="tw-mt-1 tw-font-bold" :label="Math.abs(allPayIncome?.dailySum || 0) "></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :margin="[32, 0]" :padding="[0,30]" :round="5">
			<view class=" tw-flex tw-justify-center">
				<tm-segtab @change="changeChartPay"  :round="24" :gutter="2" :height="52" :width="200" :color="color" activeColor="white" :font-size="24" :list="listPay" defaultValue="1"></tm-segtab>
			</view>
			<view class="tw-flex tw-justify-center tw-p-2">
				<tm-text :font-size="28" _class="tw-font-bold">分类统计</tm-text>
			</view>
			<view class=" tw-flex tw-justify-center tw-pt-2 tw-z-1 tw-relative">
				<tm-chart ref="chartDom" :width="660"  :height="500"></tm-chart>
			</view>
			<view class=" tw-px-5 tw-pt-5">
				<view v-for="(item, index) in allPayIncome?.children" :key="index">
					<view class=" tw-flex tw-justify-start tw-items-center tw-py-1" v-if="item.payIncome === payType">
						<text-icon :text="item.payTypeName" :color="item.color" :size="66"></text-icon>
						<view class=" tw-ml-2">
							<view class="tw-flex tw-justify-between tw-items-center">
								<view class="tw-flex tw-justify-start">
									<tm-text :font-size="26">{{ item.payTypeName }}</tm-text>
									<tm-text :font-size="24" _class="tw-ml-1">{{ caculatePercent(item.amount as number)}}%</tm-text>
								</view>
								<tm-text :font-size="24">{{ item.amount }}</tm-text>
							</view>
							<tm-progress :width="520" :height="16" :color="item.color" followTheme="false" :percent="caculatePercent(item.amount as number)"></tm-progress>
						</view>
					</view>
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
	</tm-app>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmTimePicker from "@/tmui/components/tm-time-picker/tm-time-picker.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmSegtab from "@/tmui/components/tm-segtab/tm-segtab.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";
import { getThemeColor } from "@/utils/theme";
import TmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmChart from "@/tmui/components/tm-chart/tm-chart.vue";
import usePie from './usePie'
import { getPayIncomeListByType } from '@/api/payIncome/index'
import { payIncomAllType, payIncomeType} from '@/types/user'
import tmProgress from "@/tmui/components/tm-progress/tm-progress.vue";
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import { useAppStore } from "@/store/app";
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
import isoWeek from "@/tmui/tool/dayjs/esm/plugin/isoWeek/index"
import TextIcon from '@/components/text-icon/index.vue'

const chartDom = ref<InstanceType<typeof tmChart>>();

const DayJs = dayjs.default;
DayJs.extend(isoWeek);

const { ledger } = useAppStore()

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

const tabVal = ref('0')
const payType = ref('1')
const color = computed(() => {
	return getThemeColor()
})
const list = ref([
	{ text: '月', id: '0' },
	{ text: '年', id: '1' }
])

const listPay = ref([
	{ text: '支出', id: '1' },
	{ text: '收入', id: '2' },
])

defineProps({
	safeTop: {
		type: Number,
		default: 0
	}
})

const showDate = ref<boolean>(false);
const dateModel = ref<string>(DayJs(new Date()).format('YYYY/MM'));
const changeDateSelect = (date: any) => {
	dateModel.value = date
	if (tabVal.value == '0') {
		init();
	}
}

const { defaultConfig } = usePie()
const allPayIncome = ref<payIncomAllType>()
const init = () => {
	getPayIncomeListByType({
		payDate: DayJs(dateModel.value).format('YYYY-MM-DD HH:mm:ss'),
		year: tabVal.value == '1',
		ledgerId: ledger.id
	}).then( res => {
		allPayIncome.value = res.data;
		if (payType.value === '1') {
			setChart(allPayIncome.value?.children || [], allPayIncome.value?.paySum || 0, '1')
		} else {
			setChart(allPayIncome.value?.children || [], allPayIncome.value?.incomeSum || 0, '2')
		}
	})
}

const setChart = (list: Array<payIncomeType>, all: number, payIncome: string) => {
	const config = handleChartData(list, all, payIncome);
	defaultConfig.title.text = config.title;
	defaultConfig.series[0].data = config.data;
	chartDom.value?.getChart().then((res:any) => {
		res.setOption(defaultConfig)
	})
}

const handleChartData = (list: Array<payIncomeType>, all: number, payIncome: string) : any =>{
	const config: any = {
		title: [],
		data: []
	}
	if (list == undefined) {
		return config
	}

	config.title = '总共\n' + Math.abs(all);

	list.forEach(item => {
		if (item.payIncome === payIncome) {
			config.data.push(
				{
					name: item.payTypeName, 
					value: Math.abs(item.amount || 0), 
					itemStyle: {
						color: item.color
					} 
				}
			)
		}
	})
	return config
}

const changeChart = (val: any) => {
	tabVal.value = val
	init()
}
const changeChartPay = (val: any) => {
	payType.value = val;
	if (payType.value === '1') {
		setChart(allPayIncome.value?.children || [], allPayIncome.value?.paySum || 0, '1')
	} else {
		setChart(allPayIncome.value?.children || [], allPayIncome.value?.incomeSum || 0, '2')
	}
}

onMounted(() => {
	init()
})

const caculatePercent = (num: number): number => {
	let all: number = 0;
	if (payType.value === '1') {
		all = allPayIncome.value?.paySum as number;
	} else {
		all = allPayIncome.value?.incomeSum as number;
	}
	const sum = Math.abs(num)/Math.abs(all);
	return Number((sum * 100).toFixed(0))
}
</script>

<style lang="scss" scoped></style>
