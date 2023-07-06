import React, { useMemo } from 'react'
import { Row, Col, Card, Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Role } from '../../enums/user.enum'
import UserForm from './componnets/UserForm'

export default function Center() {
  const userinfo = useSelector((state: RootState) => state.userReducer.userinfo)
  // 如果存在后端返回有头像地址，则用使用，否则使用默认的头像地址
  const avartarUrl = useMemo(() => userinfo.avatarPath ? `${process.env.REACT_APP_SERVER_URL}${userinfo.avatarPath}` : 'https://s2.loli.net/2023/07/06/gn5vemsfkXpac98.jpg', [userinfo])
  return (
    <div style={{margin: '50px 30px'}}>
      <Row style={{ height: 'calc(100vh - 64px)' }} align='top'>
        <Col span={8}>
          <Card>
            <div>
              <p><Avatar src={avartarUrl} /></p>
              <p>{userinfo.username}</p>
              <p>{userinfo.role === Role.ADMIN ? '管理员' : '编辑'}</p>

            </div>
          </Card>
        </Col>
        <Col span={15} offset={1}>
          <Card title='个人信息'>
            <UserForm />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
