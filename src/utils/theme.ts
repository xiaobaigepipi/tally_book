// 取当前项目主题色
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

export const getThemeColor = (): string => {
	let result: string =  '';
	const color: string = useTmpiniaStore().$state.tmStore.color;

	if (!color) {
		return getPrimaryColor()
	}

	const list = uni.getStorageSync('colorArrayList')
	list.forEach((item: any) => {
		if (item.name == color) {
			result = item.value
		}
	});

	return result;
}

const getPrimaryColor = (): string => {
	let result: string =  '';
	const list = uni.getStorageSync('colorArrayList')
	list.forEach((item: any) => {
		if (item.name == 'primary') {
			result = item.value
		}
	});

	return result;
}
