import { IRouteNode } from "../../types/router"
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
export default getCurrentRouterMap