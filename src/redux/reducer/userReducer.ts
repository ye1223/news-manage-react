import { IAction } from "../../types/redux"
import { IUserInfo } from "../../types/user"
interface IState {
    userinfo: IUserInfo
}
const userReducer = (prevState: IState = {
    userinfo: {
        gender: -1,
        introduction: '',
        role: -1,
        userID: '',
        username: ''
    }
}, action: IAction<IUserInfo>) => {
    const newState = {...prevState}
    switch(action.type){
        case 'change-userinfo':
            newState.userinfo = action.payload as IUserInfo
            // todo 后端接口并未返回role值，所以在这设置
            newState.userinfo.role = prevState.userinfo.role
            return newState
        default:
            return prevState
    }
}

export default userReducer