<template>
	<tm-app>
	<view class="add-page" 
		:style="{'padding-top': safeTop + 150 +'px', 'padding-bottom': safeBottom + 275 + 'px'}"
	>
		<view 
		:style="{'padding-top': safeTop + 'px', 'height': safeTop+ 145 + 'px', 'background-color': isDark ? 'black' : 'white'}" 
			class=" tw-fixed tw-inset-0 tw-top-0 tw-z-10 tw-bg-white"
		>
			<view class="tw-flex tw-justify-start tw-pl-[30rpx] tw-pt-[30rpx]">
				<tm-icon :color="isDark?'white': '#9E9E9E'" name="tmicon-times" :fontSize="40" @click="handleHide"></tm-icon>
			</view>
			<view class="tw-flex tw-justify-between tw-p-3">
				<view class="tw-flex tw-justify-start tw-text-sm">
					<view
						class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
						:class="{ 'dark-type': isDark, 'select-type-green': selectType === 1 }"
						@click="handleSelectType(1)"
						>支出</view
					>
					<view
						class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
						:class="{ 'dark-type': isDark, 'select-type-red': selectType === 2 }"
						@click="handleSelectType(2)"
						>收入</view
					>
				</view>
				<view class="tw-text-sm">
					<view
					@click="showdate = true"
						class="tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-flex tw-justify-start tw-items-center tw-rounded-sm"
						:class="{ 'dark-type': isDark }"
					>
						{{ dateModel }}<tm-icon class="tw-ml-1" name="tmicon-angle-down" color="" :fontSize="24"></tm-icon>
					</view>
				</view>
			</view>
			<view class="tw-p-[15px] tw-pt-[5rpx]">
				<tm-input :color="color" focusColor="grey" :followTheme="false" placeholder="点击添加备注" v-model.lazy="payIncome.remark"></tm-input>
			</view>
		</view>
		<view>
			<tm-grid :col="5" :transprent="true" v-if="selectType === 1">
				<tm-grid-item v-for="(item, index) in payList" :key="index" :height="150" @click="handleSelectIcon(item, index)">
					<view class="tw-flex-col tw-flex tw-items-center">
						<tm-button
							:color="selectIndex === index ? color: 'white'"
							:fontColor="selectIndex === index ? color: '#999999'"
							:follow-theme="false"
							:width="90"
							:round="20"
							:height="90"
							:fontSize="36"
							:margin="[0, 8]"
							:shadow="0"
							:text="selectIndex === index"
						>{{ item.name?.substring(0, 1)}}
					</tm-button>
						<tm-text :font-size="24">{{ item.name }}</tm-text>
					</view>
				</tm-grid-item>
			</tm-grid>
			<tm-grid :col="5" :transprent="true" v-else>
				<tm-grid-item v-for="(item, index) in incomeList" :key="index" :height="150" @click="handleSelectIcon(item, index)">
					<view class="tw-flex-col tw-flex tw-items-center">
						<tm-button
							:color="selectIndex === index ? color: 'white'"
							:fontColor="selectIndex === index ? color: '#999999'"
							:follow-theme="false"
							:width="90"
							:round="20"
							:height="90"
							:fontSize="36"
							:margin="[0, 8]"
							:shadow="0"
							:text="selectIndex === index"
						>{{ item.name?.substring(0, 1)}}
					</tm-button>
						<tm-text :font-size="24">{{ item.name }}</tm-text>
					</view>
				</tm-grid-item>
			</tm-grid>
		</view>
		<view class="tw-fixed tw-bottom-0 inset-x-0 tw-w-full tw-bg-bg-gray" :class="{ 'tw-bg-black': isDark }">
			<view class="tw-p-2 tw-pt-3 tw-pb-0 tw-flex tw-justify-between">
				<view class="tw-flex tw-justify-start tw-items-center">
					<tm-text :font-size="36" :color="color">￥</tm-text>
					<tm-text :font-size="36" :color="color" v-if="amountC" :label="amountC"></tm-text>
					<tm-text :font-size="36" :color="color" v-else>{{ '0.00' }}</tm-text>
				</view>
				<view class="tw-flex tw-justify-end">
					<tm-button size="small" :width="180" :follow-theme="false" :color="color" :round="10" :margin="[10, 0]" @click="showWin = true">{{ accountName?accountName: '选择账本'}}</tm-button>
				</view>
			</view>
			<keyborad-number :color="color" v-model="amount" decimal @confirm="confirmNumber"></keyborad-number>
			<view :style="{ height: safeBottom + 'rpx' }"></view>
		</view>
	</view>
	<tm-time-picker
		:showDetail="{
			year: true,
			month: true,
			day: true,
			hour: true,
			minute: true,
			second: true
		}"
		v-model="dateModel"
		v-model:show="showdate"
	>
	</tm-time-picker>

	<tm-drawer v-model:show="showWin" :height="900" okText="确认" hide-header>
			<view class="tw-p-[30rpx] tw-pl-[40rpx]">
				<tm-text _class="tw-font-bold">选择账户</tm-text>
				<view @click="selectAccount({id: '', name: '不选择账本'})">
					<view class=" tw-flex tw-justify-between tw-items-center">
							<view class="tw-py-2 tw-flex tw-justify-start tw-items-center">
								<text-icon text="不"></text-icon>
								<tm-text _class="tw-ml-2">不选择账户</tm-text>
							</view>
					</view>
				</view>
				<view v-for="(item) in accountList" :key="item.id" @click="selectAccount(item)">
					<view class=" tw-flex tw-justify-between tw-items-center">
							<view class="tw-py-2 tw-flex tw-justify-start tw-items-center">
								<text-icon :text="item.name"></text-icon>
								<tm-text _class="tw-ml-2">{{ item.name }}</tm-text>
							</view>
							<view class="">
								<tm-text _class="tw-ml-2">{{ item.balance }}</tm-text>
							</view>
					</view>
				</view>
			</view>
		</tm-drawer>
</tm-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import TextIcon from '@/components/text-icon/index.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import keyboradNumber from '@/tmui/components/tm-keyborad/keyborad-number.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import tmInput from '@/tmui/components/tm-input/tm-input.vue'
import tmButton from '@/tmui/components/tm-button/tm-button.vue'
import { onLoad } from '@dcloudio/uni-app'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tmGridItem from '@/tmui/components/tm-grid-item/tm-grid-item.vue'
import tmGrid from '@/tmui/components/tm-grid/tm-grid.vue'
import tmTimePicker from '@/tmui/components/tm-time-picker/tm-time-picker.vue'
import { accountUserType, payTypeType, payIncomeType } from '@/types/user'
import { getPayTypeList, getAccountSelectList } from '@/api/user'
import { postPayIncomeUpdate } from '@/api/payIncome/index'
import { getColorByName } from '@/utils/theme'
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
import isoWeek from "@/tmui/tool/dayjs/esm/plugin/isoWeek/index"
const DayJs = dayjs.default;
DayJs.extend(isoWeek);

import { useDefaultLedger } from '@/pages/hooks/useDefaultLedger'

const { defaultLedger } = useDefaultLedger()

onLoad(() => {
	safeBottom.value = uni.getSystemInfoSync()?.safeAreaInsets?.bottom || 0
	safeTop.value = uni.getSystemInfoSync()?.safeAreaInsets?.top || 0
	init();
	getSelectAccount()
})

const showWin = ref<boolean>(false);
const safeBottom = ref<number>(0);
const safeTop = ref<number>(0)

const payIncome = ref<payIncomeType>({
	payIncome: '1',
	ledgerId: defaultLedger.value.id
});
const accountName = ref<string>('');
const amount = ref<string>('')
const selectType = ref<number>(1)
const color = ref<string>(getColorByName('green'))
const selectIndex = ref<number>(-1)
const amountC = computed(() => {
	return amount.value
})
const showdate = ref<boolean>(false);
const dateModel = ref<string>(DayJs(new Date()).format('YYYY/MM/DD HH:mm:ss'));

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

const payTypeList = ref<Array<payTypeType>>();
const payList = computed(() => {
	return payTypeList.value?.filter(item => item.payType === 1) || []
})
const incomeList = computed(() => {
	return payTypeList.value?.filter(item => item.payType === 0) || []
})
const init = () => {
	getPayTypeList().then(res => {
		payTypeList.value = res.data
	})
}

const accountList = ref<Array<accountUserType>>();
const getSelectAccount = () => {
	getAccountSelectList(defaultLedger.value.id as number).then(res => {
		accountList.value = res.data;
	})
}
const selectAccount = (item: any) => {
	payIncome.value.accountId = item.id
	accountName.value = item.name
	showWin.value = false
}


const handleHide = () => {
	// #ifdef H5
	uni.navigateTo({
		url: '/pages/index/index'
	});
	// #endif
	
	// #ifdef MP-WEIXIN
	uni.navigateBack()
	// #endif
}

const confirmNumber = () => {
	if (amountC.value == '') {
		uni.showToast(
			{
				title: '请输入金额',
				icon: 'none'
			}
		)
		return;
	}

	if (selectIndex.value < 0) {
		uni.showToast(
			{
				title: '请选择收支类型',
				icon: 'none'
			}
		)
		return;
	}

	const data: payIncomeType = {
		...payIncome.value,
		amount: Number(amountC.value),
		payDate: DayJs(dateModel.value).format('YYYY-MM-DD HH:mm:ss')
	}

	if (data.payIncome == '1') {
		data.amount = -(data.amount as number)
	}
	postPayIncomeUpdate(data).then(res => {
		console.log(res)
		uni.showToast(
			{
				title: '保存成功',
				icon: 'none'
			}
		),
		uni.navigateTo({
			url: '/pages/index/index'
		})
	})
}

const handleSelectType = (val: number) => {
	selectType.value = val
	payIncome.value.payIncome = String(val);
	if (val === 1) {
		color.value = getColorByName('green')
	}
	if (val === 2) {
		color.value = getColorByName('red')
	}
}
const handleSelectIcon = (item: payTypeType, index: number) => {
 selectIndex.value = index
 payIncome.value.payTypeId = item.id;
}
</script>

<style lang="scss" scoped>
.dark-type {
	background-color: #333;
	color: #eeeeee;
}
.select-type-green {
	color: $tm-green;
	background: $tm-green-lime;
}

.select-type-red {
	color: $tm-red;
	background: $tm-red-lime;
}
.select-type-blue {
	color: $tm-blue;
	background: $tm-blue-lime;
}
</style>
