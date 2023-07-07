import { Button, Form, Input, Select, message } from 'antd';
import React from 'react';
import ImageUpload from '../../../component/Upload/ImageUpload';
import { adminapi } from '../../../api';
import { IReturnProduct } from '../../../types/product';
import { ImageType } from '../../../enums/image.enum';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const ProductAddForm: React.FC = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        // 收集的表单数据
        console.log('value' ,values)

        adminapi.addProduct(values).then(res => res.data)
            .then((res: IReturnProduct) => {
                if (res.ActionType === 'OK') {
                    message.success('添加成功')
                    // todo 是否跳转到用户列表
                } else {
                    message.error('添加失败')
                }
            }).catch(err => {
                // console.log(err)
                message.error('网络请求出错')
            })
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
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
                <ImageUpload imageType={ImageType.PRODUCT} event={(blobValue: any, rawFile: any) => {
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
    );
};

export default ProductAddForm