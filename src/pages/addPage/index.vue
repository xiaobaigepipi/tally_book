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
			<view class="tw-p-[15px] tw-pt-[5rpx]">
				<tm-input :color="color" placeholder="点击添加备注"></tm-input>
			</view>
		</view>
		<view>
			<tm-grid :col="5" :transprent="true">
				<tm-grid-item v-for="(item, index) in [1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,88,6]" :key="index" :height="150" @click="handleSelectIcon(index)">
					<view class="tw-flex-col tw-flex tw-items-center">
						<tm-button
							:color="selectIndex === index ? color: 'white'"
							:fontColor="selectIndex === index ? color: '#999999'"
							:follow-theme="false"
							icon="tmicon-account"
							:width="90"
							:round="20"
							:height="90"
							:fontSize="40"
							:margin="[0, 8]"
							:shadow="0"
							:text="selectIndex === index"
						></tm-button>
						<tm-text :font-size="24">三餐</tm-text>
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
					<tm-button size="small" :follow-theme="false" :color="color" :round="10" :margin="[10, 0]">账户</tm-button>
					<tm-button size="small" :follow-theme="false" :color="color" :round="10" :margin="[0, 0]">账本</tm-button>
				</view>
			</view>
			<keyborad-number :color="color" v-model="amount" decimal @confirm="confirmNumber"></keyborad-number>
			<view :style="{ height: safeBottom + 'rpx' }"></view>
		</view>
	</view>
</tm-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
const amountC = computed(() => {
	console.log(amount.value)
	return amount.value
})

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})

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
