export interface userType {
  id?: number;
  username?: string;
  salt?: string;
  password?: string;
  phone?: string;
  realName?: string;
  age?: number;
  email?: string;
  remark?: string;
  status?: number;
  sex?: number;
  deleted?: number;
  createCode?: number;
  updateCode?: number;
  createTime?: string;
  updateTime?: string;
  roleList?: any;
  roleIds?: number[];
}

export interface ledgerType {
  id?: number;
  name?: string;
  userId?: number;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
  remark?: string;
  status?: number;
}

export interface payTypeType {
  id?: number;
  name?: string;
  status?: number;
  icon?: string;
  createTime?: string;
  updateTime?: string;
  userId?: string;
  payType?: number;
  deleted?: number;
}

export interface accountCategoryType {
  id?: number;
  name?: string;
  createTime?: string;
  updateTime?: string;
  deleted?: number;
	children?: Array<accountType>
	amount?: number
}

export interface accountType {
  id?: number;
  name?: string;
  categoryId?: number;
  icon?: string;
  createTime?: string;
  updateTime?: string;
  color?: string;
  sort?: number;
  deleted?: number;
	children?: Array<accountUserType>
}

/**
 * 用户添加资产类型
 */
export interface accountUserType {
  balance?: number;
  createTime?: string;
  deleted?: number;
  id?: number;
  ledgerId?: number;
  name?: string;
  remark?: string;
  status?: number;
  typeId?: number;
  updateTime?: string;
  userId?: number;
	typeName?: string
}

export interface userSumDataType {
  amount?: number,
	children?: Array<accountCategoryType>
}

export interface payIncomeType {
  accountId?: number;
  amount?: number;
  createTime?: string;
  deleted?: number;
  id?: number;
  ledgerId?: number;
  payDate?: string;
  payIncome?: string;
  payTypeId?: number;
  remark?: string;
  updateTime?: string;
  userId?: number;
	payTypeName?: string
	color?: string
	accountName?: string
	children?: Array<payIncomeType>
}

export interface payIncomAllType {
	incomeSum?: number
	paySum?: number
	surplus?:number
	dailySum?: number
	children: Array<payIncomeType>
}


