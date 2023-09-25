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

/**
 *修改用户账本
 */
 export const getPayIncomeList = (data: payIncomeType) => {
	return request<payIncomAllType>({
		url: '/book/cusPayIncome/getPayIncome',
		method: 'POST',
		data
	})
}
