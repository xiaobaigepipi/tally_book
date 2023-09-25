<template>
	<tm-app>
		<tm-navbar title="管理资产" :followTheme="false" hideHome></tm-navbar>
		<view class=" tw-h-[16rpx]"></view>
		<tm-sheet
		:round="5"
		:margin="[32, 16]"
		:padding="[0,10]"
		:followTheme="false"
		>
		<view class="tw-flex tw-justify-between tw-items-center tw-text-sm tw-pl-3 tw-pt-3">
			<tm-text class="tw-font-bold">输入资产信息</tm-text>
		</view>
		<tm-divider align="center"></tm-divider>
		<tm-cell :padding="[20, 0, 20, 24]" :rightColor="color" :rightText="amount.typeName"  :border="1" :click-bg="false" :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="资产类型" @click="showWin = true">
		</tm-cell>
		<tm-cell :padding="[20, 14]"  :border="1" :click-bg="false" :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="资产名称">
			<template v-slot:right>
				<tm-input align="right" v-model.lazy="amount.name" :followTheme="false" class="tw-w-[380rpx]" focusColor="grey" placeholder="请输入名称" :border="0" transprent :fontSize="28" :showBottomBotder="false"></tm-input>
			</template>
		</tm-cell>
		<tm-cell :padding="[20, 14]"  :border="1" :click-bg="false" :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="资产余额">
			<template v-slot:right>
				<tm-input align="right" v-model.lazy="amount.balance" :followTheme="false" class="tw-w-[380rpx]" focusColor="grey" placeholder="请输入余额" :border="0" transprent :fontSize="28" :showBottomBotder="false"></tm-input>
			</template>
		</tm-cell>
		<tm-cell :padding="[20, 14]"  :click-bg="false" :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="备注">
			<template v-slot:right>
				<tm-input align="right"  v-model.lazy="amount.remark" :followTheme="false" class="tw-w-[380rpx]" focusColor="grey" placeholder="请输入备注" :border="0" transprent :fontSize="28" :showBottomBotder="false"></tm-input>
			</template>
		</tm-cell>
		<!-- <tm-cell :padding="[20, 14]" :rightTextSize="28" :click-bg="false" :margin="[0, 0]" :titleFontSize="28" title="计入总资产" label="开启后，余额会计入总资产">
			<template v-slot:right>
				<tm-switch text :label="['开', '关']" :selected="1" :un-selected="0" :default-value="amount.status" v-model="amount.status"></tm-switch>
			</template>
		</tm-cell> -->
		</tm-sheet>

		<tm-button block :margin="[32, 32]" form-type="submit" @click="handleSave">保存</tm-button>

		<tm-drawer v-model:show="showWin" :height="1000" okText="确认" hide-header>
			<view class="tw-p-[30rpx] tw-pl-[40rpx]">
				<tm-text _class="tw-font-bold">选择资产类型</tm-text>
				<view v-for="(item) in categoryList" :key="item.id">
					<view class=" tw-py-1">
						<tm-text color="grey">{{ item.name }}</tm-text>
					</view>
					<view v-for="(sitem) in item.children" :key="sitem?.name" @click="selectCategory(sitem, item)">
							<view class="tw-py-2 tw-flex tw-justify-start tw-items-center">
								<text-icon :text="sitem.name" :color="sitem.color"></text-icon>
								<tm-text _class="tw-ml-2">{{ sitem.name }}</tm-text>
							</view>
					</view>
				</view>
			</view>
		</tm-drawer>
	</tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import { accountCategoryType, accountType, accountUserType} from "@/types/user";
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import tmInput from "@/tmui/components/tm-input/tm-input.vue";
//import tmSwitch from "@/tmui/components/tm-switch/tm-switch.vue";
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import tmCell from "@/tmui/components/tm-cell/tm-cell.vue";
import { getThemeColor } from "@/utils/theme";
import { computed } from "vue";
import { getPayTypeCategory, postAddAccount, getAccountOne} from '@/api/user/index'
import TextIcon from '@/components/text-icon/index.vue'
import { useDefaultLedger } from "../hooks/useDefaultLedger";
import { onLoad} from '@dcloudio/uni-app';

const { defaultLedger }  = useDefaultLedger();

const categoryId = ref<number>();
const categoryList = ref<Array<accountCategoryType>>();
const showWin = ref<boolean>(false);
const amount = ref<accountUserType>({
	status: 1,
	ledgerId: defaultLedger.value.id
});
const color = computed(() => {
	return getThemeColor()
})

onLoad((options: any) => {
	initLoad()
	if (options.accountId) {
		getAccountOne(options.accountId).then(res => {
			amount.value = res.data as accountUserType;
		})
	}
})

const initLoad = () => {
	getPayTypeCategory().then(res => {
		categoryList.value = res.data
	})
}

const selectCategory = (item: accountType, citem: accountCategoryType) => {
	amount.value.typeName = item.name || '';
	amount.value.typeId = item.id;
	showWin.value = false;
	categoryId.value = citem.id
}

const handleSave = () => {
	if (!amount.value.typeId) {
		uni.showToast({
			title: '请选择资产类型',
			icon: 'none'
		})
		return
	}
	if (!amount.value.name) {
		uni.showToast({
			title: '请输入资产名称',
			icon: 'none'
		})
		return
	}
	if (!amount.value.balance) {
		uni.showToast({
			title: '请填写资产余额',
			icon: 'none'
		})
		return
	}
	if (categoryId.value == 3) {
		amount.value.balance = -amount.value.balance
	}
 
	postAddAccount(amount.value).then(res => {
		console.log(res.data)
		uni.showToast({
			title: '保存成功',
		})
		uni.navigateTo({
			url: '/pages/index/index'
		})
	})
}

</script>

<style lang="scss" scoped></style>
