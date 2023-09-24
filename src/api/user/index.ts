import { request } from '../request'
import { userType, ledgerType, payTypeType } from '@/types/user'

/**
 * 登录
 * @param data 
 * @returns 
 */
export const postUserLogin = (data: userType) => {
	return request<string>({
		url: '/user/login',
		method: 'POST',
		data
	})
}
/**
 * 根据token获取用户信息
 */
export const getUserInfo = () => {
	return request<userType>({
		url: '/user/info',
		method: 'GET'
	})
}
/**
 * 获取默认账本信息，没有则创建一个
 */
export const getDefaultLedgerInfo = () => {
	return request<ledgerType>({
		url: '/book/cusLedger/getDefaultInfo',
		method: 'GET',
	})
}

/**
 * 获取用户账本列表
 */
export const getLedgerList = () => {
	return request<ledgerType[]>({
		url: '/book/cusLedger/getList',
		method: 'GET',
	})
}


/**
 *修改用户账本
 */
export const postLedgerUpdate = (data: ledgerType) => {
	return request<ledgerType>({
		url: '/book/cusLedger/update',
		method: 'POST',
		data
	})
}

/**
 *获取收支分类列表
 */
 export const getPayTypeList = () => {
	return request<Array<payTypeType>>({
		url: '/book/cusPayType/list',
		method: 'GET'
	})
}

/**
 *新增修改收支类别
 */
 export const postPayTypeUpdate = (data: payTypeType) => {
	return request<payTypeType>({
		url: '/book/cusPayType/update',
		method: 'POST',
		data
	})
}

/**
 *用户首次登录，默认添加分类给用户
 */
 export const postAutoAddPayType = () => {
	return request<string>({
		url: '/book/cusPayType/addUserPayType',
		method: 'POST',
	})
}


