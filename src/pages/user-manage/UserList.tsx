import { Card, List, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { adminapi } from '../../api'
import { IReturnUserList, IUserInfo } from '../../types/user'
import UserLists from './component/UserLists'
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function UserList() {
  const [list, setlist] = useState<IUserInfo[]>([])
  useEffect(() => {
    adminapi.getUserList().then(res => res.data).then((res: IReturnUserList) => {
      if (res.ActionType === 'OK') {
        // console.log(res.listData)
        res.listData.forEach(item=>{
          item.key = item._id
        })

        console.log(res.listData)
        setlist(res.listData)
      }
    })
  }, [])
  const columns: ColumnsType<IUserInfo> = [
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: '编号',
      key: 'key'
    },
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '性别',
      key: 'gender'
    },
    {
      title: '角色',
      key: 'role'
      
    },
    {
      title: '简介',
      key: 'introduction'
    },
    {
      title: '头像',
      key: 'avatar'
    },
    {
      title: '操作',
      key: 'option'
    },
  ]
  return (
    <div>
      <Card>
        <UserLists />

        <hr />

        <Table columns={columns} dataSource={list}/>
      </Card>
    </div>
  )
}
