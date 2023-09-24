
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
