import { Avatar, Card, Popconfirm, Space, Table, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { adminapi, serverurl } from '../../api'
import { IReturnUserList, IUserInfo } from '../../types/user'
import type { ColumnsType } from 'antd/es/table';
import { Role } from '../../enums/user.enum'
import UserEditModal from './component/UserEditModal';

export default function UserList() {
  const [list, setlist] = useState<IUserInfo[]>([])
  // 控制Modal显示
  const [open, setOpen] = useState<boolean>(false);

  const [row, setrow] = useState<IUserInfo>()

  // 强制更新
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({} as any), []);

  const [update, setupdate] = useState<number>()

  useEffect(() => {
    adminapi.getUserList().then(res => res.data).then((res: IReturnUserList) => {
      if (res.ActionType === 'OK') {
        // console.log(res.listData)

        // todo key _id 后端应设置key
        res.listData.forEach(item => {
          item.key = item._id
        })

        // console.log(res.listData)
        setlist(res.listData)
      }
    })
  }, [update])




  const deleteConfirm = (id: string) => {
    try {
      adminapi.deleteUser(id).then(res => {
        if (res.data.ActionType === 'OK') {
          message.success('成功删除')
        }
      })
    } catch (error) {
      message.error('删除失败')
    }
  }

  const columns: ColumnsType<IUserInfo> = [
    {
      title: '编号',
      dataIndex: 'label',
      key: 'label',
      render: (_,record, index) =>{
        return <span>{++ index}</span>
      }
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: '性别',
      key: 'gender',
      dataIndex: 'gender'
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => {
        if (role === Role.ADMIN) {
          return <Tag color='green'>管理员</Tag>
        } else {
          return <Tag color='geekblue'>编辑</Tag>
        }
      }
    },
    {
      title: '简介',
      key: 'introduction',
      dataIndex: 'introduction'
    },
    {
      title: '头像',
      key: 'avatar',
      dataIndex: 'avatar',
      render: (_, { avatarPath }) => {
        return <Avatar src={`${serverurl}${avatarPath}`} />
      }
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, row) => {
        return <>
          <Space size="middle">
            <a onClick={() => {
              setOpen(true)
              setrow(row)
            }
            }>编辑</a>
            <Popconfirm
              title="删除"
              description="确定要删除此人员？"
              onConfirm={() => deleteConfirm(row._id as string)}
              // onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        </>
      }
    },
  ]

  console.log('reredering....')
  return (
    <div>
      <Card>
        <Table columns={columns} dataSource={list} />
        <UserEditModal
          // forceUpdate={forceUpdate}
          forceUpdateEvent={(status) => {
            setupdate(status)
          }}
          open={open}
          row={row as IUserInfo}
          event={(val) => {
            setOpen(val)
          }} />
      </Card>
    </div>
  )
}
