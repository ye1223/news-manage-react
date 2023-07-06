import React, { useEffect, useState } from 'react'
import { Avatar, Popconfirm } from 'antd'
import { AppstoreTwoTone } from '@ant-design/icons'
import './style/topbar.scss'
import { useNavigate } from 'react-router-dom'
import { collapseAction } from '../../redux/actionCreator/sidebarActionCreator'
import { connect } from 'react-redux'
import { IUserInfo } from '../../types/user'

interface IProps {
    collapseAction: any
    userinfo: IUserInfo
}

function Topbar(props: IProps) {

    const navigate = useNavigate()
    // 需要将用户信息存为状态
    const [username, setusername] = useState<string>('')

    useEffect(() => {
        setusername(props.userinfo.username)
        console.log('触发')
    }, [props.userinfo])


    const confirm = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    // 收缩collapse
    const toggleCollapse = () => {
        props.collapseAction()
    }

    return (
        <div className='top-container'>
            <div className='left'>
                <div><AppstoreTwoTone onClick={() => { toggleCollapse() }} style={{ fontSize: '30px' }} /></div>
                <h2>企业门户网站管理系统</h2>
            </div>
            <div className='right'>

                <p>
                    欢迎回来 {username}
                </p>

                <Popconfirm
                    title="操作"
                    description="您确定要退出登录？"
                    onConfirm={confirm}
                    // onCancel={cancel}
                    okText="是"
                    cancelText="取消"
                >
                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>user</Avatar>
                </Popconfirm>


            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    //   console.log(state.userReducer.userinfo) //! 空？
    return {
        userinfo: state.userReducer.userinfo
    }
}
const mapDispatchToProps = {
    collapseAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)