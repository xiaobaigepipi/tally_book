<template>
	<!-- <tm-drawer
		ref="calendarView"
		:height="1300"
		placement="bottom"
		:footHeight="450"
		v-model:show="show"
		:round="3"
		okText="确认"
		hideHeader
	> -->
	<view :style="{'padding-top': ((safeTop>=47)?safeTop:(safeTop>0?47:0)) + 'px'}">
		<view class="tw-flex tw-justify-start tw-pl-[30rpx] tw-pt-[30rpx]">
			<tm-icon name="tmicon-times" :fontSize="40" @click="handleHide"></tm-icon>
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
				<view
					class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[24rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
					:class="{ 'dark-type': isDark, 'select-type-blue': selectType === 3 }"
					@click="handleSelectType(3)"
					>不计入收支</view
				>
			</view>
			<view class="tw-text-sm">
				<view
					class="tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-flex tw-justify-start tw-items-center tw-rounded-sm"
					:class="{ 'dark-type': isDark }"
				>
					09-18<tm-icon class="tw-ml-1" name="tmicon-angle-down" color="" :fontSize="24"></tm-icon>
				</view>
			</view>
		</view>
		<view class="tw-p-[15px] tw-pt-[2rpx]">
			<tm-input :color="color" placeholder="点击添加备注"></tm-input>
		</view>
		<view class="tw-flex tw-justify-start tw-flex-wrap tw-pl-[10px] tw-pr-[10px]">
			<view v-for="(item, index) in 14" :key="index" style="height: 70px" class="tw-pl-[7px]  tw-pr-[7px]">
				<view class="tw-flex-col tw-flex tw-items-center">
					<tm-button
						:color="selectIndex === index ? color: '#333333'"
						:fontColor="selectIndex === index ? color: '#999999'"
						:follow-theme="false"
						icon="tmicon-account"
						:width="90"
						:round="20"
						:height="90"
						:fontSize="40"
						:margin="[0, 8]"
						:shadow="0"
						text
						@click="handleSelectIcon(index)"
					></tm-button>
					<tm-text :font-size="24">三餐</tm-text>
				</view>
			</view>
		</view>
		<view class="tw-absolute tw-bottom-0 tw-w-full tw-bg-bg-gray" :class="{ 'tw-bg-black': isDark }">
			<view class="tw-p-2 tw-pt-3 tw-pb-0 tw-flex tw-justify-between">
				<view class="tw-flex tw-justify-start tw-items-center">
					<tm-text :font-size="36" :color="color">￥</tm-text>
					<tm-text :font-size="36" :color="color">{{ amount ? amount : '0.00' }}</tm-text>
				</view>
				<view class="tw-flex tw-justify-end">
					<tm-button size="small" :follow-theme="false" :color="color" :round="10" :margin="[10, 0]">账户</tm-button>
					<tm-button size="small" :follow-theme="false" :color="color" :round="10" :margin="[0, 0]">账本</tm-button>
				</view>
			</view>
			<keyborad-number :color="color" v-model="amount" decimal @confirm="confirmNumber"></keyborad-number>
			<view :style="{ height: safeBottom + 'px' }"></view>
		</view>
	</view>
	<!-- </tm-drawer> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import keyboradNumber from '@/tmui/components/tm-keyborad/keyborad-number.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
// import tmScrolly from '../../tmui/components/tm-scrolly/tm-scrolly.vue'
import tmInput from '@/tmui/components/tm-input/tm-input.vue'
import tmButton from '@/tmui/components/tm-button/tm-button.vue'
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
	safeBottom.value = uni.getSystemInfoSync()?.safeAreaInsets?.bottom || 0
	safeTop.value = uni.getSystemInfoSync()?.safeAreaInsets?.top || 0
	console.log(safeTop.value >= 47)
})

const safeBottom = ref<number>(0);
const safeTop = ref<number>(0)

const amount = ref<string>('')
const selectType = ref<number>(1)
const color = ref<string>('#4ec752')
const selectIndex = ref<number>(-1)

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

const handleHide = () => {
	// uni.navigateTo({
	// 	url: '/pages/index/index'
	// });
	uni.navigateBack()
}

const confirmNumber = () => {}
const handleSelectType = (val: number) => {
	selectType.value = val
	if (val === 1) {
		color.value = '#4ec752'
	}
	if (val === 2) {
		color.value = '#FF5722'
	}
	if (val === 3) {
		color.value = '#4c93e4'
	}
}
const handleSelectIcon = (index: number) => {
 selectIndex.value = index
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
