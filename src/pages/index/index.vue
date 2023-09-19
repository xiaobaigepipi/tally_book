<template>
	<tm-app>
		<view v-if="active === 0">
			<Home :safe-top="safeTop"></Home>
		</view>

		<view v-if="active === 4">
			<My></My>
		</view>
		<tab-bar @add="handleShowAddPage"></tab-bar>
	</tm-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tabBar from '@/components/tab-bar/tab-bar.vue'
import Home from '../home/index.vue'
import My from '../my/index.vue'
import { useAppStore } from '@/store/app'
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
	safeBottom.value = uni.getSystemInfoSync()?.safeAreaInsets?.bottom || 0
	safeTop.value = uni.getSystemInfoSync()?.safeAreaInsets?.top || 0
	console.log(safeTop.value >= 47)
})

const safeBottom = ref<number>(0);
const safeTop = ref<number>(0)
const useApp = useAppStore()
const active = computed(() => {
	return useApp.$state.tabarActive
})

const handleShowAddPage = () => {
	uni.navigateTo({
		url: '/pages/addPage/index'
	})
}
</script>

<style lang="scss" scoped></style>
