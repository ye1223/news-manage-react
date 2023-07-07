import { Card } from 'antd'
import React from 'react'
import UserForm from '../center/component/UserForm'
import UserAddForm from './component/UserAddForm'
import style from '../../style/form-common.module.scss'

export default function UserAdd() {
  return (
    <div className={style.formContainer}>
      <Card>
        <UserAddForm />
      </Card>
    </div>
  )
}
