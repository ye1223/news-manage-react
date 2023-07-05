import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../pages/Login'
import Main from '../pages/MainBox'
import lazyLoad from './util/lazyLoad'
import routes from './config'
import { RouteObject } from 'react-router-dom'
import { RouterBeforeEach } from './component/RouterBeforeEach'

type R = RouteObject & {
    auth?: boolean,
    role?: number
}

const role = 1

const checkPermission = (item: R) => {
    // 如果这个路由需要权限的话
    if (item.auth) {
        return role === 1
    }
    return true
}

// >添加路由
const addRoute = (routes: R[], route: R) => {
    routes.push(route)
}

export default function IndexRouter() {
    const defaultRoutes: R[] = [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <Main />,
            children: [
                // 动态添加路由
            ]
        },
        {
            path: '*',
            element: lazyLoad('notfound/NotFound.tsx')
        }
    ]

    // 遍历routes配置，给默认配置动态添加路由
    routes.forEach(item => {
        // 给main组件添加子路由
        checkPermission(item) && addRoute(defaultRoutes.find(route=>route.path==='/')!.children as R[], item)
    })

    
    const Route = useRoutes(defaultRoutes)


    // todo <Suspense />
    return (<RouterBeforeEach routes={defaultRoutes}>
        { Route }
    </RouterBeforeEach>)
}





