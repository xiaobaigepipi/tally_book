import { ref } from 'vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import { getThemeColor } from '@/utils/theme'

const useSelectTheme = () => {
	const selectColor = ref<string>(getThemeColor())
	const store = useTmpiniaStore();
	const isDark = ref<boolean>(store.$state.tmStore.dark === true);

	const changeTheme = () => {
		store.setTmVuetifyAddTheme('theme' + new Date().getTime().toString(), selectColor.value)
	}
	function onChangeDark(val: any) {
		store.setTmVuetifyDark(val)
	}

	return {
		selectColor,
		changeTheme,
		isDark,
		onChangeDark
	}
}

export default useSelectTheme
