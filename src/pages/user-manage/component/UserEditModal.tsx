import { Input, Modal, Select, Form, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Gender } from '../../../enums/user.enum';
import { FieldData, MapInfoToFields } from '../../../hooks/useFormFields';
import { IUserInfo } from '../../../types/user';
import { adminapi } from '../../../api';
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
    open: boolean
    event: (val: boolean) => void
    row: IUserInfo
    forceUpdate?: () => void
    forceUpdateEvent: (status: number) => void
}



export default function UserEditModal({ open, event, row, forceUpdateEvent }: IProps) {
    const [userform] = Form.useForm()
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('*默认密码不修改');

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        // >设置表单默认值
        setFields(MapInfoToFields(row))
    }, [row])


    const handleOk = () => {
        setModalText('表单将会被提交');
        setConfirmLoading(true);

        try {
            adminapi.updateUser(userform.getFieldsValue()).then(res => {
                event(false)
                setConfirmLoading(false)
                message.success('更改成功')

                // 强制更新（借助的useState
                // forceUpdate()
                forceUpdateEvent(Date.now())
            })
        } catch (error) {
            message.error('修改失败')
        }

    };

    const handleCancel = () => {
        event(false)
    }

    return (
        <div>
            <Modal
                maskStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.06)'
                }}
                title="编辑信息"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <p>{modalText}</p>

                <Form
                    {...layout}
                    form={userform}
                    fields={fields}
                    name="control-hooks"
                    // onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item style={{ display: 'none' }} name="_id" label="ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码">
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

                    <Form.Item name="introduction" label="简介" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}
