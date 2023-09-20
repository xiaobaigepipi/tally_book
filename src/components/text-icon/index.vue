<template>
	<view :style="{'height': size + 'rpx', width: size+'rpx', background: color}"
		class=" tw-text-white tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-sm "
	>
		{{ icon }}
	</view>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { getThemeColor } from '../../utils/theme'

const props = defineProps({
	text: {
		type: String,
		default: 'A'
	},
	size: {
		type: Number,
		default: 52
	},
	color: {
		type: String,
		default: getThemeColor()
	}
})

const icon = computed(() => {
	return props.text.substring(0, 1)
})
</script>

<style lang="scss" scoped></style>
