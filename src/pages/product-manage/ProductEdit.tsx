import React, { useEffect, useState } from 'react'
import ProductAddForm from './component/ProductAddForm'
import { Button, Card, Form, Input, message } from 'antd'
import useFormFields from '../../hooks/useFormFields'
import { IProductInfo, IReturnProductList } from '../../types/product'
import ImageUpload from '../../component/Upload/ImageUpload'
import { ImageType } from '../../enums/image.enum'
import { useSearchParams } from 'react-router-dom'
import { adminapi } from '../../api'
import { IReturnNewsEdit } from '../../types/news'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default function ProductEdit() {
  // 获取query参数
  const [params, setparms] = useSearchParams()
  const productid = params.get('productid')
  // console.log(params.get('productid'))
  const [form] = Form.useForm()
  const [product, setproduct] = useState<IProductInfo>()
  const fields = useFormFields(product as IProductInfo)

  useEffect(() => {
    try {
      adminapi.getProduct(productid as string).then(res => res.data).then((res: IReturnProductList) => {
        if (res.ActionType === 'OK') {
          // console.log(res.productList[0])
          setproduct(res.productList[0])
        }
      })
    } catch (error) {
      message.error('网络请求错误')
    }
  }, [])

  const onFinish = (val: any) => {
    console.log(val)

    try {
      adminapi.editNews(val).then(res => res.data).then((res: IReturnNewsEdit) => {
        if (res.ActionType === 'OK') {
          message.success('成功更新')
        }
      })
    } catch (error) {
      message.error('网络请求错误')
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
          fields={fields}
        >
          <Form.Item name="title" label="产品名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="introduction" label="产品摘要" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="detail" label="产品详细" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="productCover" label="封面" rules={[{ required: true }]}>
            <ImageUpload
              edit={true}
              imageType={ImageType.PRODUCT}
              event={(blobValue: any, rawFile: any) => {
                form.setFieldsValue({ productCover: blobValue, file: rawFile });
              }} />
          </Form.Item>

          {/* 占位用的 */}
          <Form.Item name='file' rules={[{ required: false }]}>
            <Input style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType='submit'>
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
