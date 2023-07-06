import React, { useEffect, useState } from 'react';
import { HomeTwoTone, IdcardTwoTone, FileTextTwoTone, ShopTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Role } from '../../enums/user.enum';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
// MenuProps['items']
/* let items: MenuItem[] = [
    getItem('首页', '/', <HomeTwoTone />),
    { type: 'divider' },
    getItem('个人中心', '/center', <IdcardTwoTone />),
    { type: 'divider' },

    getItem('用户列表', 'user', <IdcardTwoTone />, [
        getItem('添加用户', '/user/add'),
        getItem('用户列表', '/user/list')
    ]),
    { type: 'divider' },
    getItem('新闻管理', 'news', <FileTextTwoTone />, [
        getItem('添加新闻', '/news/add'),
        getItem('新闻列表', 'news/list')
    ]),
    { type: 'divider' },
    getItem('产品管理', 'product', <ShopTwoTone />, [
        getItem('添加产品', '/product/add'),
        getItem('产品列表', '/product/list')
    ]),
]
 */


const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const onClick: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);
        navigate(e.key)
    }
    const role = useSelector((state: RootState) => state.userReducer.userinfo.role)
    const [items, setitems] = useState<MenuItem[]>( [
        getItem('首页', '/', <HomeTwoTone />),
        { type: 'divider' },
        getItem('个人中心', '/center', <IdcardTwoTone />),
        { type: 'divider' },
    
        getItem('用户列表', 'user', <IdcardTwoTone />, [
            getItem('添加用户', '/user/add'),
            getItem('用户列表', '/user/list')
        ]),
        { type: 'divider' },
        getItem('新闻管理', 'news', <FileTextTwoTone />, [
            getItem('添加新闻', '/news/add'),
            getItem('新闻列表', 'news/list')
        ]),
        { type: 'divider' },
        getItem('产品管理', 'product', <ShopTwoTone />, [
            getItem('添加产品', '/product/add'),
            getItem('产品列表', '/product/list')
        ]),
    ])

    useEffect(() => {
        // 假如此时为Editor， 删除用户列表管理
        if(role === Role.EDITOR){
            let newItems = [...items]
            newItems.splice(3, 2)
            setitems(newItems)
        }
    }, [])
    return (
        <Menu
            onClick={onClick}
            style={{ width: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default Sidebar