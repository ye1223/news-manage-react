/* 
  路由守卫
*/
import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { chnageFirstGetAllRouteAction } from "../../redux/actionCreator/routerActionCreator"
import getCurrentRouterMap from "../util/getCurrentRoute"
import { RootState } from "../../redux/store"
import Login from "../../pages/Login"

// 组件
// props.children
const RouterBeforeEach = ({ children, routes, firstGetAllRoutes, userinfo }: any) => {
  const location = useLocation();
  const navigate = useNavigate()
  let flag = true
  useEffect(() => {
    // >如果路由和登录相关直接return
    if (location.pathname.includes('login')) return
    
    // >检查token
    if (!localStorage.getItem('token')) {
      navigate('/login')
      // flag = false
    } else {
      /* 
        路由加载过久不用重新加载路由了，
        每次路由守卫加载路由损耗性能
      */

      // 首次加载
      if(firstGetAllRoutes){
        // 删除main的嵌套路由

        // 加载所有路由

        // 放行
        
      } else {
        // 放行
        
      }
    }

    /* // 获取当前的路由
    let route = getCurrentRouterMap(routes, location.pathname)
    console.log(routes, route, location.pathname)
    
      //  >路由拦截
      //   1. 登录页直接跳转
      //   2. 其他页-->查看授权
   
    // 当前已是登录状态
    if (route.auth) {
      // navigator('/login')
      console.log('需要auth')
      
    } else {
      console.log('不需要auth')
    } */
  }, [location.pathname])
  // if(flag){
  //   return children
  // } else {
  //   return <Login />
  // }
  return children
}



const mapStateToProps = (state: RootState) => {
  return {
    firstGetAllRoutes: state.routerReducer.isFirstLoadAllRoutes,
    userinfo: state.userReducer.userinfo
  }
}
const mapDispatchToProps = {
  chnageFirstGetAllRouteAction
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterBeforeEach)