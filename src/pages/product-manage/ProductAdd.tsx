import React from 'react'
import ProductAddForm from './component/ProductAddForm'
import { Card } from 'antd'
import style from '../../style/form-common.module.scss'

export default function ProductAdd() {
  return (
    <div className={style.formContainer}>
      <Card>
        <ProductAddForm />
      </Card>
    </div>
  )
}
