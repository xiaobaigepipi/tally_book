import { request } from '../request'
import { payIncomeType, payIncomAllType } from '@/types/user'

/**
 *修改用户账本
 */
 export const postPayIncomeUpdate = (data: payIncomeType) => {
	return request({
		url: '/book/cusPayIncome/add',
		method: 'POST',
		data
	})
}

interface payType {
	payDate?: string,
	year?: boolean,
	ledgerId?: number | string
}
/**
 *修改用户账本
 */
 export const getPayIncomeList = (data: payType) => {
	return request<payIncomAllType>({
		url: '/book/cusPayIncome/getPayIncome',
		method: 'POST',
		data
	})
}

/**
 *修改用户账本
 */
 export const getPayIncomeListByType = (data: payType) => {
	return request<payIncomAllType>({
		url: '/book/cusPayIncome/getPayIncomeByPayType',
		method: 'POST',
		data
	})
}

/**
 *获取收支信息
 */
 export const getPayIncomeInfo = (data: payIncomeType) => {
	return request<payIncomeType>({
		url: '/book/cusPayIncome/info',
		method: 'GET',
		data
	})
}
