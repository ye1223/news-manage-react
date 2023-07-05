// 一个嵌套数组
// import { Config } from '../types/router'

import lazyLoad from './util/lazyLoad'
// import {RouteConfig} from 'react-router-config'
import { RouteObject } from 'react-router-dom'
import Home from '../pages/home/Home'
import NewsAdd from '../pages/news-manage/NewsAdd'
import NewsEdit from '../pages/news-manage/NewsEdit'
import NewsList from '../pages/news-manage/NewsList'
import Redirect from './component/Redirect'
import { IRouteNode } from '../types/router'
import ProductList from '../pages/product-manage/ProductList'
import ProductAdd from '../pages/product-manage/ProductAdd'
import ProductEdit from '../pages/product-manage/ProductEdit'

type R = RouteObject & {
    auth?: boolean,
    role?: number
}

const routes: IRouteNode[] = [
    {
        path: '/',
        element: <Home />,
        auth: false
    },
    {
        path: 'center',
        element: lazyLoad('center/Center.tsx'),
    },
    {
        path: 'news',
        element: <Redirect to='/news/list' />
    },
    {
        path: 'news/list',
        element: <NewsList />
        
    },
    {
        path: 'news/add',
        element: <NewsAdd />,
        
    },
    {
        path: 'news/edit',
        element: <NewsEdit />
    },
    {
        path: 'product',
        element: <Redirect to='/product/list' />,
        auth: true
    },
    {
        path: 'product/list',
        element: <ProductList />,
        auth: true
    },
    {
        path: 'product/add',
        element: <ProductAdd />,
        auth: true
    },
    {
        path: 'product/edit',
        element: <ProductEdit />,
        auth: true
    },
    /* {
        path: '/',
        element: <Redirect to='/home'/>
    } */
    
]

/* const routeFilter = (routes: Config, role: number) => {
    
} */

export default routes