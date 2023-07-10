export interface IUserInfo {
    gender: number,
    introduction: string,
    role: number,
    userID: string,
    username: string,
    avatarPath?: string
    file?: any
    key?:string
    _id?: string
}

// 后端返回的用户信息接口
export interface IReturnUserInfo {
    ActionType: string
    info: IUserInfo
}

// 添加用户，后端返回的结果
export interface IReturnAddResult{
    ActionType: string
}

// 列表
export interface IReturnUserList {
    ActionType: string
    listData: IUserInfo[]
}