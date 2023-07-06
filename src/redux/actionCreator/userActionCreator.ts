import { IUserInfo } from "../../types/user"

// todo useinfo类型
const userInfoAction = (value: IUserInfo) => ({
    type: 'change-userinfo',
    payload: value
})

export {
    userInfoAction
}