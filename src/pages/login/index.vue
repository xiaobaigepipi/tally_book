<template>
	<tm-app>
		<view class="tw-flex tw-w-full tw-pt-[300rpx]">
			<tm-sheet class="tw-w-full" :round="5">
				<tm-text :font-size="30" _class="text-weight-b" label="账号密码登录"></tm-text>
				<tm-divider></tm-divider>
				<tm-input v-model="user.username" :height="80" prefix="tmicon-user-fill" placeholder="请输入账号"></tm-input>
				<tm-input :height="80" v-model="user.password" placeholder="请输入密码" :margin="[0, 24]" prefix="tmicon-lock-fill"></tm-input>
				<tm-button block label="登录" @click="toLogin"></tm-button>
			</tm-sheet>
		</view>
	</tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmInput from "@/tmui/components/tm-input/tm-input.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import { postUserLogin, getDefaultLedgerInfo, postAutoAddPayType} from "@/api/user";
import { userType, ledgerType } from "@/types/user";
import { useAppStore } from '@/store/app'

const user = ref<userType>({
	username: '',
	password: ''
});
const useApp = useAppStore();

const toLogin = async () => {
	postUserLogin(user.value).then( async (res) => {
		uni.setStorageSync('token', res.data)
		const payType: responseType<string>= await postAutoAddPayType();
		console.log(payType)
		const tedger: responseType<ledgerType> = await getDefaultLedgerInfo();
		if (tedger.data != undefined) {
			useApp.changeLedgerInfo(tedger.data)
		}
		uni.showToast({
			title: '登录成功',
			icon: 'success',
			duration: 2000
		})
		uni.navigateTo({ url: '/pages/index/index' })
	}).catch(err => {
		console.log(err)
	})
}
</script>

<style lang="scss" scoped></style>
