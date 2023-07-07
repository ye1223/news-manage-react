import React from 'react'
import MyEditor from './component/Editor'
import { Button, Card, Form, Input } from 'antd'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default function NewsAdd() {
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }
  const onFinish = (value: any) => {

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
            <MyEditor event={(value: string)=>{
              // form.setFieldValue({name: 'content', value})
            }} />
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
