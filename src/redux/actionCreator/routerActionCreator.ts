const chnageFirstGetAllRouteAction = (value: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: 'change-first-router',
            payload: value
        })
    }
}

export { chnageFirstGetAllRouteAction }