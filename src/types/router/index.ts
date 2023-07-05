import React from "react"

export interface Config {
    path: string,
    element: React.JSX.Element
}

// 路由配置节点
export interface IRouteNode {
    path: string,
    name?: string,
    element: React.ReactNode,
    children?: IRouteNode[],
    auth?: boolean
}