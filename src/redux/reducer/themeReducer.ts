import { IAction } from "../../types/redux";
import { ThemeMode } from "../../types/theme";
interface IState {
    themeMode: number
}

const themeReducer = (prevState: IState = {
    themeMode: ThemeMode.LIGHT
}, action: IAction<number>) => {
    const newState = {...prevState}
    switch (action.type) {
        case 'switch-theme-mode':
            newState.themeMode = action.payload as number
            return newState
        default:
            return prevState
    }
}

export default themeReducer