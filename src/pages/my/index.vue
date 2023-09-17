<template>
	<tm-navbar title="我的" :followTheme="false" hideHome> </tm-navbar>
	<tm-text :color="color" class="tw-text-center"> 暗黑模式测试 </tm-text>
	<tm-float-button @click="onChangeDark" :btn="{ icon: 'tmicon-ios-sunny' }" :offset="[32, 140]"> </tm-float-button>
	<tm-color-view v-model="colorName" @confirm="changeTheme"></tm-color-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import { getThemeColor } from '@/utils/theme'
import tmFloatButton from '@/tmui/components/tm-float-button/tm-float-button.vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import tmNavbar from '@/tmui/components/tm-navbar/tm-navbar.vue'
import tmColorView from '@/tmui/components/tm-color-view/tm-color-view.vue'
import { computed } from 'vue'
import { testRequest } from '@/api/record/index'
import { onMounted } from 'vue'
const store = useTmpiniaStore()
const color = computed(() => {
	return getThemeColor()
})
const colorName = ref<string>(getThemeColor())

function onChangeDark() {
	store.setTmVuetifyDark(!store.$state.tmStore.dark)
}
const changeTheme = () => {
	// console.log(colorName.value)
	store.setTmVuetifyAddTheme('theme' + new Date().getTime().toString(), colorName.value)
}
onMounted(() => {
	testRequest().then(res => {
		console.log(res)
	}).catch(err => {
		console.log(err)
	})
})
</script>

<style lang="scss" scoped></style>
