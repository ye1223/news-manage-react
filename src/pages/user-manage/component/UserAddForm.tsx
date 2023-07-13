import { Button, Form, Input, Select, message } from 'antd';
import React from 'react';
import ImageUpload from '../../../component/Upload/ImageUpload';
import { adminapi } from '../../../api';
import { Gender, Role } from '../../../enums/user.enum';
import { IReturnAddResult } from '../../../types/user';
import { ImageType } from '../../../enums/image.enum';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    // wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};


const UserAddForm: React.FC = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        // 收集的表单数据
        // console.log('value' ,values)

        adminapi.addUser(values).then(res => res.data)
            .then((res: IReturnAddResult) => {
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
            // style={{ maxWidth: 600 }}
            style={{ width: '600px' }}
        >
            <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                <Select
                    placeholder="情选择性别"
                    allowClear
                >
                    <Option value={Gender.MALE}>男</Option>
                    <Option value={Gender.FEMALE}>女</Option>
                    <Option value={Gender.SECRET}>保密</Option>
                </Select>
            </Form.Item>
            <Form.Item name="role" label="角色" rules={[{ required: true }]}>
                <Select
                    placeholder="情选择角色"
                    allowClear
                >
                    <Option value={Role.ADMIN}>管理员</Option>
                    <Option value={Role.EDITOR}>编辑</Option>
                </Select>
            </Form.Item>

            <Form.Item name="introduction" label="个人简介" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
                <ImageUpload isAddUser={true} imageType={ImageType.AVATAR} event={(blobValue: any, rawFile: any) => {
                    form.setFieldsValue({ avatar: blobValue, file: rawFile });
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

export default UserAddForm