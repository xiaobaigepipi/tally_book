<template>
		<view class="tw-pl-[20rpx] tw-pr-[20rpx] tw-pb-[20rpx]">
			<view class=" tw-flex tw-justify-start tw-items-center">
				<view>
					<tm-button :follow-theme="false" :color="color" size="small"></tm-button>
				</view>
				<view class=" tw-flex tw-justify-start tw-items-center tw-ml-2">
					<tm-text>
						颜色值
					</tm-text>
					<view class=" tw-w-[300rpx] tw-ml-2">
						<tm-input disabled v-model="color" :font-color="color"></tm-input>
					</view>
				</view>
			</view>
			<view class="tw-flex tw-justify-start tw-flex-wrap">
				<view class=" tw-w-[50rpx] tw-h-[50rpx] tw-mr-1 tw-mt-2" v-for="(item, index) in colorList" :key="index">	
					<view class=" tw-w-[50rpx] tw-h-[50rpx] tw-rounded" :style="{'background-color': item.value}" @click="selectColor(item)"></view>
				</view>
			</view>
		</view>
</template>

<script setup lang="ts">
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import tmInput from "@/tmui/components/tm-input/tm-input.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import { ref } from "vue";

const color = ref('');
const colorList = ref([
	{
		value: '#4c93e4'
	},
	{
		value: '#67C23A'
	},
	{
		value: '#F56C6C'
	},
	{
		value: '#E6A23C'
	},
	{
		value: '#909399'
	},
	{
		value: '#606266'
	},
	{
		value: '#780650'
	},
	{
		value: '#cf1322'
	},
	{
		value: '#a8071a'
	},
	{
		value: '#fa541c'
	},
	{
		value: '#ad2102'
	},
	{
		value: '#610b00'
	},
	{
		value: '#d46b08'
	},
	{
		value: '#ffa940'
	},
	{
		value: '#ff4d4f'
	},
	{
		value: '#873800'
	},
	{
		value: '#ad6800'
	},
	{
		value: '#faad14'
	},
	{
		value: '#ad8b00'
	},
	{
		value: '#3f6600'
	},

	{
		value: '#135200'
	},
	{
		value: '#092b00'
	},
	{
		value: '#002329'
	},
	{
		value: '#006d75'
	},
	{
		value: '#1677ff'
	},
	{
		value: '#4096ff'
	},
	{
		value: '#0958d9'
	},
	{
		value: '#001d66'
	},
	{
		value: '#030852'
	},
	{
		value: '#597ef7'
	},
	{
		value: '#9254de'
	},
	{
		value: '#531dab'
	},
	{
		value: '#120338'
	},
	{
		value: '#722ed1'
	},
	{
		value: '#b37feb'
	},
	{
		value: '#531dab'
	},
	{
		value: '#eb2f96'
	},
	{
		value: '#780650'
	},
	{
		value: '#096dd9'
	},
	{
		value: '#002766'
	},
	{
		value: '#95de64'
	},
	{
		value: '#bae637'
	},
	{
		value: '#52c41a'
	},
]);

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	}
});

color.value = props.modelValue

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
}>()

const selectColor = (item: any) => {
	if (!item.value) return;
	color.value = item.value
	emit('update:modelValue', color.value)
}
</script>

<style lang="scss" scoped></style>
