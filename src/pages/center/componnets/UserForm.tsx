import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import ImageUpload from '../../../component/Upload/ImageUpload';
import { adminapi } from '../../../api';
import { Gender } from '../../../enums/user.enum';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const UserForm: React.FC = () => {
    const [form] = Form.useForm();
    // const [blobValue, setblobValue] = useState<string>()

    // 性别选择
    const onGenderChange = (value: number) => {
        switch (value) {
            case Gender.MALE:
                form.setFieldsValue({ note: 'Hi, man!' });
                break;
            case Gender.MALE:
                form.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case Gender.SECRET:
                form.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
        }
    };

    // todo axios提交
    const onFinish = (values: any) => {
        // 收集的表单数据
        console.log(values)

        adminapi.upload(values).then(res=>{
            console.log('onfinish' ,res)
        }).catch(err=>{
            console.log(err)
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
            <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                <Select
                    placeholder="情选择性别"
                    onChange={onGenderChange}
                    allowClear
                >
                    <Option value={Gender.MALE}>男</Option>
                    <Option value={Gender.FEMALE}>女</Option>
                    <Option value={Gender.SECRET}>保密</Option>
                </Select>
            </Form.Item>
{/*             <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item> */}

            <Form.Item name="introduction" label="个人简介" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
                <ImageUpload event={(blobValue: any, rawFile: any)=>{
                    // setblobValue(blobValue)
                    form.setFieldsValue({ avatar: blobValue, file: rawFile });
                }} />
            </Form.Item>

            <Form.Item name='file' rules={[{ required: false }]}>
                <Input style={{display: 'none'}}/>
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
    );
};

export default UserForm;