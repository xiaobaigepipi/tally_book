<template>
	<tm-app>
		<view v-if="active === 0">
			<Home></Home>
		</view>

		<view v-if="active === 4">
			<My></My>
		</view>

		<add-page v-model="showAddPage"></add-page>
		
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
import addPage from '../addPage/index.vue'

const useApp = useAppStore()

const active = computed(() => {
	return useApp.$state.tabarActive
})
const showAddPage = ref<boolean>(false)

const handleShowAddPage = () => {
	showAddPage.value = true
}
</script>

<style lang="scss" scoped></style>
