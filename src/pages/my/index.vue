<template>
	<tm-navbar title="我的" :followTheme="false" hideHome> </tm-navbar>
	<tm-sheet :margin="[32, 32]" :padding="[10, 10]" :round="5">
		<tm-cell
			showAvatar
			avatar="/static/logo.png"
			rightText=""
			:margin="[0, 0]"
			:titleFontSize="28"
			:title="userInfo?.realName"
			:rightTextSize="28"
			:border="1"
		>
		</tm-cell>
		<tm-cell :rightTextSize="28" :border="1" :margin="[0, 0]" :titleFontSize="28" title="电话" :rightText="userInfo?.phone">
		</tm-cell>
		<tm-cell :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="注册日期"  :rightText="userInfo?.createTime"> </tm-cell>
	</tm-sheet>

	<tm-sheet :margin="[32, 32]" :padding="[10, 10]" :round="5">
		<tm-cell :rightTextSize="28" :border="1" :margin="[0, 0]" :titleFontSize="28" title="收支分类管理" @click="toLedgerPage('/pages/addPage/payIncomType')"></tm-cell>
		<tm-cell :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="账本管理" @click="toLedgerPage('/pages/ledger/index')"> </tm-cell>
	</tm-sheet>

	<tm-sheet :margin="[32, 32]" :padding="[10, 10]" :round="5">
		<tm-cell :rightTextSize="28" :margin="[0, 0]" :border="1" :titleFontSize="28" title="主题设置" @click="showWin = true"> </tm-cell>
		<tm-cell :rightTextSize="28" :margin="[0, 0]" :titleFontSize="28" title="暗黑模式">
			<template v-slot:right>
				<tm-switch text :label="['开', '关']" :default-value="isDark" v-model="isDark" @change="onChangeDark"></tm-switch>
			</template>
		</tm-cell>
	</tm-sheet>
	<view class="tw-m-[32rpx] tw-mt-5">
		<tm-button block label="退出" @click="handleLoginOut"></tm-button>
	</view>
	<tm-drawer ref="calendarView" placement="bottom" v-model:show="showWin" :round="3" okText="确认" @ok="changeTheme">
		<theme v-model="selectColor"></theme>
	</tm-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import tmButton from '@/tmui/components/tm-button/tm-button.vue'
import tmNavbar from '@/tmui/components/tm-navbar/tm-navbar.vue'
import { getUserInfo} from '@/api/user/index'
import tmCell from '@/tmui/components/tm-cell/tm-cell.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmSwitch from '@/tmui/components/tm-switch/tm-switch.vue'
import tmDrawer from '@/tmui/components/tm-drawer/tm-drawer.vue'
import Theme from './theme.vue'
import useSelectTheme from './theme'
import { userType } from '@/types/user'

const calendarView = ref<InstanceType<typeof tmDrawer> | null>(null)
const showWin = ref<boolean>(false);
const userInfo = ref<userType>()

const { selectColor, changeTheme, isDark, onChangeDark } = useSelectTheme();
// console.log(isDark.value)

onMounted(() => {
	getUserInfo().then(res => {
		userInfo.value = res.data;
	}).catch(err => {
		console.log(err)
	})
})

const toLedgerPage = (url: string) => {
	uni.navigateTo({
		url: url
	})
}

const handleLoginOut = () => {
	uni.navigateTo({
		url: '/pages/login/index'
	})
	uni.removeStorageSync('token')
}



</script>

<style lang="scss" scoped></style>
