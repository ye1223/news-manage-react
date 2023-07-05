import React from "react"

const lazyLoad = (path: string) => {
    const Component = React.lazy(()=>import(`../../pages/${path}`))
    return (
        // todo: 增加一个fallback组件
        <React.Suspense fallback='加载中。。'>
            <Component />
        </React.Suspense>
    )
}

export default lazyLoad