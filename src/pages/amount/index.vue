<template>
	<view class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-10" :style="{'height': safeTop*2 + 180 + 'rpx'}">
		<tm-sheet :height="180 + (safeTop*2)" :transprent="isDark === true" :margin="[0, 0]" :padding="[0,0]" :color="isDark?'':color" :linear="isDark?'':'bottom'">
			<view :style="{'height':safeTop  + 'px'}"></view>
			<view class=" tw-px-[32rpx] tw-py-[20rpx]">
				<tm-text :font-size="36">我的账本</tm-text>
			</view>
		</tm-sheet>
	</view>
	<view :style="{'height': safeTop + 30 + 'px'}"></view>
	<view class=" tw-relative tw-z-50">
		<tm-sheet :height="100" :round="5" :margin="[32, 32]" :padding="[20,20]">
			<view>
				<tm-text  :font-size="30" _class=" tw-font-bold">总资产</tm-text>
			</view>
			<view class=" tw-mt-1">
				<tm-text  :font-size="40" _class=" tw-font-bold  text-red">￥12373.00</tm-text>
			</view>
		</tm-sheet>
	</view>

	<tm-sheet :round="5">
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
			<tm-text class="tw-font-bold">资金账户</tm-text>
			<tm-text class="tw-font-bold">共 36182.88</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>

		<view v-for="(secondItem, secondIndex) in acounts" :key="secondIndex">
			<view class="tw-flex tw-justify-between tw-items-center">
				<view class="flex tw-justify-start tw-items-center">
					<text-icon :text="secondItem.name" :color="secondItem.color"></text-icon>
					<tm-text class="tw-ml-1">{{ secondItem.name }}</tm-text>
				</view>
				<view class="tw-text-red tw-text-sm">{{ secondItem.value }}</view
				>
			</view>
			<view class="tw-h-2" v-if="secondIndex < acounts.length - 1"></view>
		</view>
	</tm-sheet>

	<tm-sheet :round="5">
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
			<tm-text class="tw-font-bold">投资理财</tm-text>
			<tm-text class="tw-font-bold">共 36182.88</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>

		<view v-for="(secondItem, secondIndex) in acounts1" :key="secondIndex">
			<view class="tw-flex tw-justify-between tw-items-center">
				<view class="flex tw-justify-start tw-items-center">
					<text-icon :text="secondItem.name" :color="secondItem.color"></text-icon>
					<tm-text class="tw-ml-1" >{{ secondItem.name }}</tm-text>
				</view>
				<view class="tw-text-red tw-text-sm">{{ secondItem.value }}</view
				>
			</view>
			<view class="tw-h-2" v-if="secondIndex < acounts.length - 1"></view>
		</view>
	</tm-sheet>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { getThemeColor, getIsDark } from "@/utils/theme";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import { ref } from "vue";
import TextIcon from '@/components/text-icon/index.vue'

const isDark = computed(() => {
	return getIsDark()
})

const color = computed(() => {
	return getThemeColor()
})

defineProps({
	safeTop: {
		type: Number,
		default: 0
	}
})

const acounts = ref<Array<any>>([
	{
		name: '支付宝',
		value: '5263.00'
	},
	{
		name: '交通银行',
		value: '1263.00',
		color: 'blue'
	}
]);

const acounts1 = ref<Array<any>>([
	{
		name: '股票',
		value: '5263.00',
		color: 'red'
	},
	{
		name: '基金',
		value: '1263.00',
		color: 'green'
	}
]);
</script>

<style lang="scss" scoped></style>
