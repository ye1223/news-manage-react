import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminapi } from '../../api'
import { INewsInfo, IReturnNewsEdit, IReturnNewsInfo } from '../../types/news'
import { Button, Card, Form, Input, Select, message } from 'antd'
import MyEditor from './component/Editor'
import ImageUpload from '../../component/Upload/ImageUpload'
import { ImageType } from '../../enums/image.enum'
import { Category } from '../../enums/news.enum'
import { checkPic } from './util/validator'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import useFormFields from '../../hooks/useFormFields'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function NewsEdit() {
  const params = useParams()
  const [news, setnews] = useState<INewsInfo>()
  // newsid ===> params.newsid
  console.log('params', params.newsid)
  useEffect(() => {
    adminapi.getNews(params.newsid as string).then(res => res.data).then((res: IReturnNewsInfo) => {
      if (res.ActionType === 'OK') {
        // console.log(res.newsList[0])
        setnews(res.newsList[0])
      }
    })
  }, [])
  console.log('newsssss' ,news)
  const [form] = Form.useForm<INewsInfo>()

  const fileds = useFormFields(news as INewsInfo)
  
  const onFinish = (val: any) => {
    console.log(val)
    try {
      adminapi.editNews(val).then(res=>res.data).then((res: IReturnNewsEdit)=>{
        if(res.ActionType === 'OK'){
          console.log('okkkkkk')
          // 更新表格
        }
      })
    } catch (error) {
      message.error('请求错误')
    }
  }

  const onReset = () => {
    form.resetFields()
  }


  return (
    <div>
      <Card>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          fields={fileds}
        >
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <MyEditor content={news?.content} event={(value: string) => {
              form.setFieldValue('content', value)
            }} />
          </Form.Item>

          <Form.Item name="category" label="类别" rules={[{ required: true }]}>
            <Select
              placeholder="情选择新闻类别"
              allowClear
            >
              <Select.Option value={Category.LATEST}>最新动态</Select.Option>
              <Select.Option value={Category.TYPICAL}>典型案例</Select.Option>
              <Select.Option value={Category.INFORM}>通知公告</Select.Option>
            </Select>
          </Form.Item>

          {/* coverPath */}
          <Form.Item name="coverPath" label="封面" rules={[{ validator: checkPic }]}>
            <ImageUpload edit={true} imageType={ImageType.NEWS} event={(val, rawFile) => {
              // console.log('val', val, 'rawfile', rawFile)

              form.setFieldsValue({ coverPath: val, file: rawFile, _id: params.newsid, isPublish: 0 })
            }} />
          </Form.Item>

          <Form.Item name='file'>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item name='_id'>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item name='isPublish'>
            <Input style={{ display: 'none' }} />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType='submit'>
              {/* <Button type="primary"> */}
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div >
  )
}
