import { IAction } from "../../types/redux";

interface IState {
    isCollapsed: boolean
}
const sidebarReducer = (prevState: IState = {
    isCollapsed: false
}, action: IAction<boolean>) => {
    const newState = {...prevState}
    switch(action.type){
        case 'change-collapse':
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return prevState
    }
}

export default sidebarReducer