import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { IRouteNode } from "../../types/router"

// 组件
// props.children
export const RouterBeforeEach = ({ children, routes }: any) => {
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    // >如果路由和登录相关直接return
    if(location.pathname.includes('login') ) return
    // >检查token
    if(!localStorage.getItem('token')){
      navigate('/login')
    } else {
      /* 
        路由加载过久不用重新加载路由了，
        每次路由守卫加载路由损耗性能
      */
     
    }

    // 当前的路由
    let route = getCurrentRouterMap(routes, location.pathname)
    console.log(routes, route, location.pathname)
    /* 
       >路由拦截
        1. 登录页直接跳转
        2. 其他页-->查看授权
    */
    if (route.auth) {
      // navigator('/login')
      console.log('需要auth')
    } else {
      console.log('不需要auth')
    }
  }, [location.pathname])
  return children
}

// 获取当前的路由
const getCurrentRouterMap = (routers: IRouteNode[], path: string): IRouteNode => {
  for (let router of routers) {

    // 子路由不加/前缀
    if ('/' + router.path === path) return router
    if (router.children) { // 递归子路由
      const childRouter = getCurrentRouterMap(router.children, path)
      if (childRouter) return childRouter
    }
  }
  // return routers[routers.length - 1]
  // 默认返回主页home
  return (routers.find(_=>_.path==='/')) as IRouteNode
}
