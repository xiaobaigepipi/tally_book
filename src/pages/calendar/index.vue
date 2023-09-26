<template>
	<tm-app>
		<tm-navbar title="日历视图" :followTheme="false" hideHome> </tm-navbar>
		<tm-sheet :round="5" :margin="[32, 32]" >
			<view class=" tw-flex tw-justify-around">
				<view class=" tw-flex tw-flex-col tw-items-center">
						<tm-text :fontSize="24" _class="text-gray">月收入</tm-text>
						<tm-text :fontSize="28"  class="tw-font-bold tw-mt-[10rpx]" :label="allPayIncome?.incomeSum ||0"></tm-text>
				</view>
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text :fontSize="24" _class="text-gray">月支出</tm-text>
					<tm-text :fontSize="28"  class="tw-mt-[10rpx] tw-font-bold" :label="Math.abs(allPayIncome?.paySum || 0)"></tm-text>
				</view>
				<view class=" tw-flex tw-flex-col tw-items-center">
					<tm-text :fontSize="24" _class="text-gray">月结余</tm-text>
					<tm-text :fontSize="28"  class="tw-mt-[10rpx] tw-font-bold" :label="allPayIncome?.surplus || 0"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :round="5" :margin="[32, 0]" >
			<tm-calendar-view @change="handleChange" @click="handleClick" v-model="date" :defaultValue="date" :dateStyle="dateStyle" hideButton format="YYYY-MM-DD"></tm-calendar-view>
		</tm-sheet>

		<tm-sheet :round="5" :margin="[32, 32]" :padding="[32, 32, 32, 20]" v-if="selectData?.payDate">
			<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
				<tm-text class="tw-font-bold">{{ selectData.payDate.substring(6, 10).replace('-', '/') }}</tm-text>
				<tm-text class="tw-font-bold">{{ selectData.amount }}</tm-text>
			</view>
			<tm-divider align="center"></tm-divider>
			<view v-for="(secondItem, secondIndex) in selectData.children" :key="secondIndex">
				<view class="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<view class="flex tw-justify-start tw-items-center">
						<view
							class="tw-bg-green tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
							v-if="(secondItem.amount as number) < 0"
						></view>
						<view
							class="tw-bg-red tw-w-[12rpx] tw-h-[12rpx] tw-rounded tw-mr-2"
							v-if="(secondItem.amount as number) > 0"
						></view>
						<view>
							<tm-text class="">{{ secondItem.payTypeName}}</tm-text>
							<tm-text :font-size="20" _class="text-gray">{{ secondItem.remark }}</tm-text>
						</view>
					</view>
					<view class="tw-text-green tw-text-sm" v-if="secondItem.amount as number < 0"
						>-{{ secondItem?.amount?.toFixed(2) }}</view
					>
					<view class="tw-text-red tw-text-sm" v-if="secondItem.amount as number >= 0"
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
import { payIncomAllType, payIncomeType} from '@/types/user'
import { getColorByName } from "@/utils/theme";
import { getPayIncomeList } from '@/api/payIncome/index'
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
import isoWeek from "@/tmui/tool/dayjs/esm/plugin/isoWeek/index"
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import { onLoad } from "@dcloudio/uni-app";
const DayJs = dayjs.default;
DayJs.extend(isoWeek);

const date = ref([DayJs(new Date()).format('YYYY-MM-DD')]);


const selectData = ref<payIncomeType>();
const dateStyle: any = ref([]);

const allPayIncome = ref<payIncomAllType>()
const init = (val: string | Date) => {
	dateStyle.value = [];
	getPayIncomeList({payDate: DayJs(val).format('YYYY-MM-DD HH:mm:ss')}).then( res => {
		allPayIncome.value = res.data;

		if (allPayIncome.value?.children) {
			allPayIncome.value.children.forEach((item: payIncomeType) => {
				if((item.amount || 0) > 0) {
					dateStyle.value.push({
						date: item.payDate?.substring(0, 10) || '', //日期
						text: false, //浅色背景。
						color: getColorByName('red'), //主题色.
						extra: item.amount //额外的内容，在日期下方显示的文本。
					})
				} else {
					dateStyle.value.push({
						date: item.payDate?.substring(0, 10) || '', //日期
						text: false, //浅色背景。
						color: getColorByName('green'), //主题色.
						extra: item.amount //额外的内容，在日期下方显示的文本。
					})
				}
			})
		}

		handleClick(val)
	})
}

const handleChange = (val: any) => {
	date.value = [DayJs(val).format('YYYY-MM-DD')]
	init(val)
}

onLoad(() => {
	init(new Date())
})


const handleClick = (val: string | Date) => {
	const date = DayJs(val).format('YYYY-MM-DD')
	selectData.value = {}
	allPayIncome.value?.children?.forEach((item : payIncomeType) => {
		if (item.payDate?.substring(0, 10)=== date) {
			selectData.value = item;
		}
	})
}
</script>

<style lang="scss" scoped>
</style>
