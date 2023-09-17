<template>
	<!-- #ifdef H5 -->
	<view class="tw-h-[150rpx]"></view>
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<view class="tw-h-[170rpx]"></view>
	<!-- #endif -->
	<tm-tabbar :autoSelect="false" v-model:active="active">
		<tm-tabbar-item
			v-for="(item, index) in navList"
			:key="item.key"
			:text="item.name"
			:icon="item.icon"
			:icon-size="item.iconSize || 38"
			@click="changeActive(index)"
			:btn-top="item.btnTop"
			:active="item.active"
			:font-color="item.fontColor"
			:color="item.color"
			followTheme
		>
		</tm-tabbar-item>
	</tm-tabbar>
</template>

<script setup lang="ts">
import { useActive } from './useActive'
import tmTabbar from '@/tmui/components/tm-tabbar/tm-tabbar.vue'
import tmTabbarItem from '@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue'
import { getThemeColor } from '@/utils/theme'

interface navType {
	name?: string
	icon?: string
	iconSize?: number
	key: number
	btnTop?: boolean
	active?: boolean
	fontColor?: string
	color?: string
}

const navList: navType[] = [
	{
		name: '账单',
		icon: 'tmicon-home',
		key: 0,
	},
	{
		name: '图表',
		icon: 'tmicon-border-bottom',
		key: 1,
	},
	{
		name: '',
		icon: 'tmicon-plus',
		key: 4,
		iconSize: 48,
		btnTop: true,
		active: true,
		fontColor: 'white',
		color: getThemeColor(),
	},
	{
		name: '资产',
		icon: 'tmicon-qiandai',
		key: 2,
	},
	{
		name: '我的',
		icon: 'tmicon-account',
		key: 3,
	},
]
// console.log(path)
const { active, changeActive } = useActive()
</script>

<style lang="scss" scoped></style>
