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
            return newState
        default:
            return prevState
    }
}

export default userReducer