<template>
	<tm-drawer
		ref="calendarView"
		:height="1200"
		placement="bottom"
		:footHeight="450"
		v-model:show="show"
		:round="3"
		okText="确认"
		hideHeader
	>
		<view class="tw-flex tw-justify-end tw-pr-[30rpx] tw-pt-[30rpx]">
			<tm-icon name="tmicon-times" :fontSize="40" @click="handleHide"></tm-icon>
		</view>
		<view class="tw-flex tw-justify-between tw-p-3">
			<view class="tw-flex tw-justify-start tw-text-sm">
				<view
					class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
					:class="{ 'dark-type': isDark,  'select-type-green': selectType === 1,}"
					@click="handleSelectType(1)"
					>支出</view
				>
				<view
					class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
					:class="{ 'dark-type': isDark,  'select-type-red': selectType === 2 }"
					@click="handleSelectType(2)"
					>收入</view
				>
				<view
					class="tw-rounded-sm tw-bg-bg-gray tw-p-[10rpx] tw-pl-[24rpx] tw-pr-[20rpx] tw-mr-1 tw-text-gray-500"
					:class="{ 'dark-type': isDark,  'select-type-blue': selectType === 3 }"
					@click="handleSelectType(3)"
					>不计入收支</view
				>
			</view>
			<view class="tw-text-sm">
				<view
					class="tw-bg-bg-gray tw-p-[10rpx] tw-pl-[20rpx] tw-pr-[20rpx] tw-mr-1 tw-flex tw-justify-start tw-items-center tw-rounded-sm"
					:class="{ 'dark-type': isDark, }"
				>
					09-18<tm-icon class="tw-ml-1" name="tmicon-angle-down" color="" :fontSize="24"></tm-icon>
				</view>
			</view>
		</view>
		<tm-scrolly :height="550">
				<view v-for="(item, index) in 50" :key="index" style="height: 40px" class="px-36">
					<tm-text>{{ item }}</tm-text>
				</view>
		</tm-scrolly>
		<view class="tw-absolute tw-bottom-0 tw-w-full tw-bg-bg-gray" :class="{ 'tw-bg-black': isDark }">
			<keyborad-number :color="color" v-model="amount" decimal @confirm="confirmNumber"></keyborad-number>
			<view :style="{ height: sysinfo.bottom + 'rpx' }"></view>
		</view>
	</tm-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import keyboradNumber from '@/tmui/components/tm-keyborad/keyborad-number.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import tmScrolly from '../../tmui/components/tm-scrolly/tm-scrolly.vue'

const amount = ref<string>('')
const sysinfo = uni.$tm.u.getWindow()
const selectType = ref<number>(1)
const color = ref<string>('#4ec752');

const isDark = computed(() => {
	return useTmpiniaStore().$state.tmStore.dark === true
})
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})

const show = computed<boolean>({
	set(val) {
		emit('update:modelValue', val)
	},
	get() {
		return props.modelValue
	},
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()

const handleHide = () => {
	show.value = false
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
</script>

<style lang="scss" scoped>
.dark-type{
	background-color: #333;
	color: #eeeeee;
}
.select-type-green{
	color: $tm-green;
	background: $tm-green-lime;
}

.select-type-red{
	color: $tm-red;
	background: $tm-red-lime;
}
.select-type-blue{
	color: $tm-blue;
	background: $tm-blue-lime;
}
</style>
