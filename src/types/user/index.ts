export interface IUserInfo {
    gender: number,
    introduction: string,
    role: number,
    userid: string,
    username: string,
    avatarPath?: string
    file?: any
}

// 后端返回的用户信息接口
export interface IReturnUserInfo {
    ActionType: string
    info: IUserInfo
}