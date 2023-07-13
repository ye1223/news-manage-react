import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { ThemeMode } from "../types/theme"

const useThemeColor = () => {
    let style: React.CSSProperties
    const themeMode = useSelector((state: RootState) => state.themeReducer.themeMode)
    if (themeMode === ThemeMode.LIGHT) {
        style = {
            backgroundColor: '#fff',
            color: '#000'
        }
    } else {
        style = {
            // backgroundColor: 'rgb(25,24,24)',
        }
    }
    return style
}

export default useThemeColor