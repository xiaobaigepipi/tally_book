<template>
	<tm-app>
		<tm-navbar title="切换账本" :followTheme="false" hideHome></tm-navbar>
		<view class=" tw-h-[16rpx]"></view>
		<tm-sheet
		:round="5"
		:margin="[32, 16]"
		:padding="[40, 40]"
		:followTheme="false"
		v-for="item in ledgerList"
		:key="item.name"
		>
			<view class=" tw-flex tw-justify-between">
				<tm-text :fontSize="32">{{ item.name }}</tm-text>
				<tm-icon name="tmicon-md-more" :font-size="30" @click="handleSelectLedger(item)"></tm-icon>
			</view>
			<tm-divider align="center"></tm-divider>
			<view class=" tw-flex tw-justify-between">
				<tm-text>创建于：{{ item.createTime?.substring(0,10) }}</tm-text>
				<tm-tag text :shadow="0" color="red" size="m" label="当前账本" :margin="[0, 0]" v-if="item.status === 1"></tm-tag>
			</view>
		</tm-sheet>
		<tm-float-button @click="addLedger" :btn="{ icon: 'tmicon-plus' }"> </tm-float-button>

		<tm-drawer v-model:show="showWin" okText="确认" hide-header>
			<tm-form @submit="confirmSubmit" ref="form" v-model="ledger" :label-width="190" :margin="[20, 20]" :padding="[0, 0]">
				<tm-form-item
					required
					field="name"
					label="账本名称"
					:rules="[
						{ required: true, message: '不能为空', validator: (val: any) => val.length > 0 },
					]"
				>
					<tm-input :inputPadding="[0, 0]" v-model.lazy="ledger.name" focusColor="grey" :follow-theme="false" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item
					label="当前账本"
					:border="false"
				>
				<tm-switch text :label="['是', '否']" :defaultValue="ledger.status" v-model="ledger.status" :selected="1" :un-selected="0"></tm-switch>
				</tm-form-item>
				<tm-button block :margin="[40, 40]" form-type="submit">确认</tm-button>
			</tm-form>
		</tm-drawer>
	</tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import tmTag from "@/tmui/components/tm-tag/tm-tag.vue";
import { ledgerType } from "@/types/user";
import { getLedgerList, postLedgerUpdate } from '@/api/user/index'
import { onMounted } from "vue";
import tmFloatButton from '@/tmui/components/tm-float-button/tm-float-button.vue'
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import tmFormItem from '@/tmui/components/tm-form-item/tm-form-item.vue'
import tmForm from '@/tmui/components/tm-form/tm-form.vue'
import tmInput from "@/tmui/components/tm-input/tm-input.vue";
import tmSwitch from "@/tmui/components/tm-switch/tm-switch.vue";
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import { useDefaultLedger } from '@/pages/hooks/useDefaultLedger'

const form = ref<InstanceType<typeof tmForm> | null>(null);
const { changeLedger } = useDefaultLedger();

const ledger = ref<ledgerType>({
	name: ''
});
const ledgerList = ref<Array<ledgerType>>();
const showWin = ref<boolean>(false);

onMounted(() => {
	initLoad()
})

const initLoad = () => {
	getLedgerList().then(res => {
		ledgerList.value = res.data;
	})
}

const addLedger = () => {
	ledger.value = {
		name: '',
		status: 0
	},
	showWin.value = true;
}

const confirmSubmit = (result: any) => {
	if (result.isPass) {
		postLedgerUpdate(ledger.value).then(res => {
			if (res.code === 0)
			initLoad();
			showWin.value = false;
			if (ledger.value.status === 1) {
				changeLedger(ledger.value)
			}
		})
	}
}

const handleSelectLedger = (item: ledgerType) => {
	showWin.value = true
	ledger.value = {...item}
	// console.log(ledger.value)
}

</script>

<style lang="scss" scoped></style>
