import React, { useEffect, useState } from 'react'
import MyEditor from './component/Editor'
import { Button, Card, Form, Input, Select } from 'antd'
import { Category } from '../../enums/news.enum';
import ImageUpload from '../../component/Upload/ImageUpload';
import { ImageType } from '../../enums/image.enum';
import { adminapi } from '../../api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { INewsInfo } from '../../types/news';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default function NewsAdd() {
  const [form] = Form.useForm<INewsInfo>()
  const userid = useSelector((state: RootState) => state.userReducer.userinfo.userID)


  const onReset = () => {
    form.resetFields()
  }
  const onFinish = (value: any) => {
    adminapi.addNews(value).then(res => res.data).then(res => {
      console.log(res)
    })
  }

  const checkPic = (rule: any, value: []) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject(new Error('请上传图片'))
      } else {
        resolve(value)
      }
    })
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
        >
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <MyEditor event={(value: string) => {
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
            <ImageUpload imageType={ImageType.NEWS} event={(val, rawFile) => {
              console.log('val', val, 'rawfile', rawFile)

              form.setFieldsValue({ coverPath: val, file: rawFile, userID: userid, isPublish: 0 })
            }} />
          </Form.Item>

          <Form.Item name='file'>
            <Input style={{ display: 'none' }} />
          </Form.Item>
          <Form.Item name='userID'>
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
    </div>
  )
}
