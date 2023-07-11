import React, { useEffect, useState } from 'react'
import { adminapi } from '../../api'
import { IProductInfo, IReturnProductDelete, IReturnProductList } from '../../types/product'
import type { ColumnsType } from 'antd/es/table'
import { Button, Popconfirm, Space, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
  const [list, setlist] = useState<IProductInfo[]>([])
  const [update, setupdate] = useState<number>()
  const navigate = useNavigate()

  useEffect(() => {
    try {
      adminapi.getProductList().then(res => res.data).then((res: IReturnProductList) => {
        if (res.ActionType === 'OK') {
          // console.log('111' ,res.productList)
          res.productList.forEach(item => {
            item.key = item._id
          })
          setlist(res.productList)
        }
      })
    } catch (error) {
      message.error('请求出错')
    }
  }, [update])

  const deleteConfirm = (productid: string) => {
    try {
      adminapi.deleteProduct(productid).then(res => res.data).then((res: IReturnProductDelete) => {
        if (res.ActionType === 'OK') {
          setupdate(Date.now())
          message.success('成功删除')
        }
      })
    } catch (error) {
      message.error('请求出错')
    }
  }

  const handleEdit = (productid: string) => {
    navigate(`/product/edit?productid=${productid}`)
  }


  const columns: ColumnsType<IProductInfo> = [
    {
      title: '编号',
      dataIndex: 'label',
      key: 'label',
      render: (_, record, index) => {
        return <span>{++index}</span>
      }
    },
    {
      title: '产品',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render: (_, { _id }) => {
        return <>
          <Space size="middle">
            <Button
              onClick={() => handleEdit(_id)}
              type="primary"
              size='small'
              shape='round'
            >
              编辑
            </Button>

            <Popconfirm
              title="删除"
              description="确定要删除此产品？"
              onConfirm={() => deleteConfirm(_id)}
              // onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                size='small'
                danger
                shape='round'
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        </>
      }

    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={list} />
    </div>
  )
}
