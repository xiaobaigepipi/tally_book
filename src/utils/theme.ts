// 取当前项目主题色
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

export const getThemeColor = (): string => {
	let result: string =  '';
	const color: string = useTmpiniaStore().$state.tmStore.color;

	if (!color) {
		return getColorByName('primary')
	}

	const list = uni.getStorageSync('colorArrayList')
	list.forEach((item: any) => {
		if (item.name == color) {
			result = item.value
		}
	});

	return result;
}

export const getColorByName = (type: string): string => {
	let result: string =  '';
	const list = uni.getStorageSync('colorArrayList')
	list.forEach((item: any) => {
		if (item.name == type) {
			result = item.value
		}
	});

	return result;
}

export const getIsDark = () => {
	return useTmpiniaStore().$state.tmStore.dark === true
}

