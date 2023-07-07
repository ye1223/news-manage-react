import { Card } from 'antd'
import React from 'react'
import UserForm from '../../component/User/UserForm'

export default function UserAdd() {
  return (
    <div style={{
      width: '70%',
      height: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card>
        <UserForm />
      </Card>
    </div>
  )
}
