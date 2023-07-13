import { Card } from 'antd'
import React from 'react'
import UserForm from '../center/component/UserForm'
import UserAddForm from './component/UserAddForm'
import style from '../../style/form-common.module.scss'
import useThemeColor from '../../hooks/useThemeColor'

export default function UserAdd() {
  const style1 = useThemeColor()
  return (
    <div className={style.formContainer}>
      <Card bodyStyle={ style1 }>
        <UserAddForm />
      </Card>
    </div>
  )
}
