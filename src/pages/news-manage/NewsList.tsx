import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { INewsInfo, IReturnNewsDelete, IReturnNewsInfo, IReturnNewsPublish } from '../../types/news'
import { adminapi, serverurl } from '../../api'
import { Button, Modal, Popconfirm, Space, Switch, Table, Tag, message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Category } from '../../enums/news.enum'
import { useNavigate } from 'react-router-dom'
import { CloseCircleOutlined } from '@ant-design/icons'
import formatTime from '../../util/formattime'

export default function NewsList() {
  const [list, setlist] = useState<INewsInfo[]>([])
  const userid = useSelector((state: RootState) => state.userReducer.userinfo.userID)

  // 更新列表标志
  const [update, setupdate] = useState<number>(-1)

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  // 预览打开的新闻
  const [news, setnews] = useState<INewsInfo>()

  useEffect(() => {
    try {
      // 根据不同用户获取列表：管理员能查看全部新闻；编辑，只能查看自己新闻
      adminapi.getNewsList(userid).then(res => res.data).then((res: IReturnNewsInfo) => {
        if (res.ActionType === 'OK') {
          // console.log('111', res.newsList)
          // todo 增加key
          res.newsList?.forEach(item => {
            item.key = item._id
          })
          setlist(res.newsList)

        }
      })
    } catch (error) {
      message.error('错误')
    }
  }, [update])

  const handleSwitch = (checked: boolean, newsid: string) => {
    console.log(checked, newsid)
    try {
      adminapi.handleNewsPublish(checked, newsid).then(res => res.data).then((res: IReturnNewsPublish) => {
        if (res.ActionType === 'OK') {
          message.success(`${checked ? '发布成功' : '成功取消发布'}`)
          // 更新列表
          setupdate(Date.now())
        }
      })
    } catch (error) {
      message.error('发布失败')
    }
  }

  // 编辑
  const handleEdit = (newsid: string) => {
    // 跳转到新闻编辑页面
    navigate(`/news/edit/${newsid}`)
  }
  const deleteConfirm = (newsid: string) => {
    try {
      adminapi.deleteNews(newsid).then(res => res.data).then((res: IReturnNewsDelete) => {
        if (res.ActionType === 'OK') {
          message.success('成功删除')
          setupdate(Date.now())
        }
      })
    } catch (error) {
      message.error('请求失败')
    }
  }

  const handlePreview = (currentNews: INewsInfo) => {
    setIsModalOpen(true)
    setnews(currentNews)
  }

  const columns: ColumnsType<INewsInfo> = [
    {
      title: '编号',
      dataIndex: 'label',
      key: 'label',
      render: (_,record, index) =>{
        return <span>{++ index}</span>
      }
    },
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '分类',
      key: 'category',
      dataIndex: 'category',
      render: (_, { category }) => {
        switch (category) {
          case Category.LATEST:
            return <Tag color='green'>最新动态</Tag>
          case Category.TYPICAL:
            return <Tag color='blue'>典型案例</Tag>
          case Category.INFORM:
            return <Tag color='red'>通知公告</Tag>
          default:
            message.error('分类错误')
        }
      }
    },
    {
      title: '更新时间',
      key: 'editTime',
      dataIndex: 'editTime',
      render: (_, {editTime}) => {
        return formatTime(editTime)
      }
    },
    {
      title: '是否发布',
      key: 'isPublish',
      dataIndex: 'isPublish',
      render: (_, { isPublish, _id }) => {
        return <Switch defaultChecked={Boolean(isPublish)} onChange={(checked: boolean) => handleSwitch(checked, _id)} />
      }
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render: (_, row) => {
        return <>
          <Space size="middle">

            <Button
              onClick={() => handlePreview(row)}
              type="default"
              size='small'
              shape='round'
            >
              预览
            </Button>
            <Button
              onClick={() => handleEdit(row._id)}
              type="primary"
              size='small'
              shape='round'
            >
              编辑
            </Button>

            <Popconfirm
              title="删除"
              description="确定要删除此新闻？"
              onConfirm={() => deleteConfirm(row._id)}
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
      <Modal title={news?.title}
        open={isModalOpen}
        closable={false}
        footer={<CloseCircleOutlined style={{ fontSize: '20px' }} onClick={() => {
          setIsModalOpen(false)
        }} />}
      >
        <img
          src={`${serverurl}${news?.coverPath}`}
          alt="" width='60%'
          style={{
            display: 'block',
            margin: '0 auto'
          }} />

        {/* 渲染 */}
        <div dangerouslySetInnerHTML={{ __html: news?.content as any }}></div>
      </Modal>
    </div>
  )
}
