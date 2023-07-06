import { IAction } from "../../types/redux";


const sidebarReducer = (prevState = {
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