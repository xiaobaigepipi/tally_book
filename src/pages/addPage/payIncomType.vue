<template>
	<tm-app>
		<tm-navbar :followTheme="false" hideHome>
			<tm-segtab v-model="payType" :round="24" :gutter="4" :height="60" :width="240" :color="payType==1?green:red" activeColor="white" :font-size="24" :list="list" :defaultValue="1"></tm-segtab>
		</tm-navbar>
		<view class=" tw-h-[10rpx]"></view>
		<tm-sheet
			:round="3"
			:margin="[20, 10]"
			:padding="[10, 10]"
			:followTheme="false"
			v-if="payType === 1"
			>
				<tm-cell v-for="(item, index) in payList" :key="item.id" :margin="[0, 0]" :padding="[10, 14]"  :titleFontSize="30" @click="showWin = true; pay=item" :bottomBorder="index < payList?.length-1">
					<template #title>
						<view class=" tw-flex tw-justify-start tw-items-center"> 
							<text-icon :text="item.name" :color="green"></text-icon>
							<tm-text _class="tw-ml-1">{{ item.name }}</tm-text>
						</view>
					</template>
				</tm-cell>
		</tm-sheet>

		<tm-sheet
			:round="3"
			:margin="[20, 10]"
			:padding="[10, 10]"
			:followTheme="false"
			v-else
			>
				<tm-cell v-for="(item, index) in incomeList" :key="item.id" :margin="[0, 0]" :padding="[10, 14]"  :titleFontSize="30" @click="showWin = true; pay = item" :bottomBorder="index < incomeList?.length-1">
					<template #title>
						<view class=" tw-flex tw-justify-start tw-items-center"> 
							<text-icon :text="item.name" :color="red"></text-icon>
							<tm-text _class="tw-ml-1">{{ item.name }}</tm-text>
						</view>
					</template>
				</tm-cell>
		</tm-sheet>


		<tm-drawer v-model:show="showWin" okText="确认" hide-header :height="900">
			<tm-form @submit="confirmSubmit" ref="form" v-model="pay" :label-width="190" :margin="[20, 20]" :padding="[0, 0]">
				<tm-form-item
					required
					field="name"
					label="收支名称"
					:rules="[{ required: true, message: '收支名称不能为空', validator: (val: any) => val && val.length > 0 }]"
				>
					<tm-input :inputPadding="[0, 0]" v-model.lazy="pay.name" focusColor="grey" :follow-theme="false" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item label="收支类型" field="payType" :rules="[{ required: false, message: '请选择收支类型' }]">
					<view @click="showPicker = !showPicker" class="flex flex-row flex-row-center-between">
						<tm-text :userInteractionEnabled="false" :label="payTypeName"></tm-text>
						<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>
					</view>
				</tm-form-item>
				<tm-button block :margin="[40, 40]" form-type="submit" :followTheme="false" :color="payType==1?green:red">确认</tm-button>
			</tm-form>
		</tm-drawer>

		<view class="tw-h-[120rpx]"></view>
		<tm-button _class="tw-fixed tw-bottom-2 !tw-ml-[190rpx]" @click="showWin=true; pay = {}" :width="400" :round="20" :followTheme="false" :color="payType==1?green:red">添加分类</tm-button>

		<tm-picker
			:columns="pickerlist"
			v-model:model-str="payTypeName"
			v-model:show="showPicker"
			:default-value="pickerSelect"
			v-model="pickerSelect"
		></tm-picker>
	</tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmSegtab from "@/tmui/components/tm-segtab/tm-segtab.vue";
import { getColorByName } from "@/utils/theme";
import { computed } from "vue";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmCell from "@/tmui/components/tm-cell/tm-cell.vue";
import TextIcon from '@/components/text-icon/index.vue'
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import tmFormItem from '@/tmui/components/tm-form-item/tm-form-item.vue'
import tmForm from '@/tmui/components/tm-form/tm-form.vue'
import tmInput from "@/tmui/components/tm-input/tm-input.vue";
import { getPayTypeList, postPayTypeUpdate } from "@/api/user";
import { payTypeType } from "@/types/user";
import { onMounted } from "vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";
import tmPicker from "@/tmui/components/tm-picker/tm-picker.vue";
import { watch } from "vue";
const form = ref<InstanceType<typeof tmForm> | null>(null);

const list = ref([
	{ text: '支出', id: 1 },
	{ text: '收入', id: 0},
])
const payType = ref<number>(1);
const payTypeName = ref<string>('')
const pay = ref<payTypeType>({
	name: '',
	payType: 1
});
const payTypeList = ref<Array<payTypeType>>();
const showWin = ref<boolean>(false)

const green = computed(() => {
	return getColorByName('green');
})
const red = computed(() => {
	return getColorByName('red');
})
const payList = computed(() => {
	return payTypeList.value?.filter(item => item.payType === 1) || []
})

const incomeList = computed(() => {
	return payTypeList.value?.filter(item => item.payType === 0) || []
})

const pickerSelect = ref<number[]>([payType.value])
const showPicker = ref(false)
const pickerlist = ref([
	{
		text: '收入',
		id: 0
	},
	{
		text: '支出',
		id: 1
	}
])

onMounted(() => {
	init()
})

watch(payType, (newValue) => {
	// console.log(newValue, olaValue)
	pickerSelect.value = [newValue]
})


const init = () => {
	getPayTypeList().then(res => {
		payTypeList.value = res.data
	})
}

const confirmSubmit = (result: any) => {
	if (result.isPass) {
		const data = {
			...pay.value,
			payType: pickerSelect.value[0]
		}
		postPayTypeUpdate(data).then(res => {
			if (res.code === 0)
			init();
			showWin.value = false;
		})
	}
}
</script>

<style lang="scss" scoped></style>
