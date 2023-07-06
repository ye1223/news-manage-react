// import Immutable, { fromJS } from 'immutable'

import { IAction } from "../../types/redux"

/* const routerReducer: any = (prevState = fromJS({
    isFirstLoadAllRoutes: true
}), action: any) => {
    if (!(prevState instanceof Map)) {
        prevState = fromJS(prevState);
    }
    switch (action.type) {
        case 'change-first-router':
            return prevState.set('isFirstLoadAllRoutes', action.payload)
        default:
            return prevState
    }

} */

interface IState {
    isFirstLoadAllRoutes: boolean
}
const routerReducer = (prevState: IState = {
    isFirstLoadAllRoutes: true
}, action: IAction<boolean>) => {
    const newState = { ...prevState }
    switch (action.type) {
        case 'change-first-router':
            newState.isFirstLoadAllRoutes = (action.payload) as boolean
            return newState
        default:
            return prevState
    }

}

export default routerReducer