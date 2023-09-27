<template>
	<view class="" :style="{'height': safeTop + 90 + 'px'}">
		<tm-sheet :height="180 + (safeTop*2)" :transprent="isDark === true" :margin="[0, 0]" :padding="[0,0]" :color="isDark?'':color" :linear="isDark?'':'bottom'">
			<view :style="{'height':safeTop  + 'px'}"></view>
			<view class=" tw-px-[32rpx] tw-py-[20rpx]">
				<tm-text :font-size="36">{{ ledger?.name }}</tm-text>
			</view>
		</tm-sheet>
	</view>
	<!-- <view :style="{'height': safeTop + 30 + 'px'}"></view> -->
	<view class=" tw-relative tw-z-50" :style="{'margin-top': -60 + 'px'}">
		<tm-sheet :height="100" :round="5" :margin="[32, 32]" :padding="[20,20]">
			<view class=" tw-flex tw-justify-between tw-items-center">
				<view>
					<tm-text  :font-size="30" _class=" tw-font-bold">总资产</tm-text>
					<view class=" tw-mt-1">
						<tm-text  :font-size="40" _class=" tw-font-bold" :label="'￥'+sumall"></tm-text>
					</view>
				</view>
					<tm-button
						color="green"
						icon="tmicon-plus"
						:width="60"
						:round="10"
						:height="60"
						:fontSize="30"
						:margin="[10]"
						:shadow="0"
						@click="toAddPage"
						text
						size="normal"
					></tm-button>
			</view>
		</tm-sheet>
	</view>

	<tm-sheet :round="5" v-for="(item) in accountList" :key="item.name">
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm">
			<tm-text class="tw-font-bold">{{ item.name }}</tm-text>
			<tm-text class="tw-font-bold">共 {{ item.amount }}</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>

		<view v-for="(secondItem, secondIndex) in item.children" :key="secondIndex">
			<view v-for="(sitem) in secondItem.children" :key="sitem.id" @click="toAddPage(sitem)">
				<view class="tw-flex tw-justify-between tw-items-center tw-mb-3">
				<view class="flex tw-justify-start tw-items-center">
					<view>
						<text-icon :text="secondItem.name" :color="secondItem.color"></text-icon>
					</view>
					<view class="tw-ml-1">
						<tm-text>{{ sitem.name }}</tm-text>
						<tm-text :font-size="18" _class="text-gray tw-mt-[4rpx]" v-if="sitem.remark">{{ sitem.remark }}</tm-text>
					</view>
				</view>
				<tm-text :font-size="28" v-if="(sitem.balance as number) > 0">{{ sitem.balance }}</tm-text>
				<view class="tw-text-green tw-text-sm" v-else>{{ sitem.balance }}</view>
				</view>
			</view>
		</view>
	</tm-sheet>
</template>

<script setup lang="ts">
import { computed,  ref, onMounted } from "vue"
import { getThemeColor, getIsDark } from "@/utils/theme";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import TextIcon from '@/components/text-icon/index.vue'
import { useAppStore } from "@/store/app";
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import {getUserAccountList} from '@/api/user/index'
import { accountCategoryType } from "@/types/user";


const { ledger }  = useAppStore();
const isDark = computed(() => {
	return getIsDark()
})

const color = computed(() => {
	return getThemeColor()
})
const accountList = ref<Array<accountCategoryType>>();
const sum = ref<number>(0);
const sumall = computed(() => {
	return sum.value
})

defineProps({
	safeTop: {
		type: Number,
		default: 0
	}
})

const toAddPage = (item: any) => {
	console.log(item)
	const url = ('/pages/amount/addAmount') + (item.id?("?accountId="+item.id) : '');
	// console.log(url)
	uni.navigateTo({
		url: url
	})
}
onMounted(() => {
	init()
})

const init = () => {
	getUserAccountList(ledger.id as number).then(res => {
		accountList.value = res.data?.children
		sum.value = res.data?.amount as number
	})
}
</script>

<style lang="scss" scoped></style>
