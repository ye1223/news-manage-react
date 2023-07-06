import { IAction } from "../../types/redux"
import { IUserInfo } from "../../types/user"
const userReducer = (prevState = {
    userinfo: {}
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