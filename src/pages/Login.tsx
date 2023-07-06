import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { adminapi } from '../api'
import styled from 'styled-components'
import Particles from "react-particles"
import { loadFull } from "tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import store from '../redux/store'
import { connect } from 'react-redux'
import { userInfoAction } from '../redux/actionCreator/userActionCreator'
const StyledDiv = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`
interface IProps {
  userinfo: string
  userInfoAction: any
}

const Login: React.FC<IProps> = (props) => {
  const [form] = Form.useForm()
  const username = Form.useWatch<string>('username', form)
  const password = Form.useWatch<string>('password', form)
  const [disabled, setdiabled] = useState<boolean>(true)
  const navigate = useNavigate()



  useEffect(() => {
    //表单未提交前的验证
    form.validateFields({ validateOnly: true }).then(value => {
      setdiabled(false)
    }).catch(err => {
      setdiabled(true)
    })
  }, [username, password])



  // 提交表单且数据验证成功后回调事件
  const onFinish = (val: any) => {
    console.log('finish', val)

    adminapi.login('/adminapi/user/login', { username, password }).then(res => {
      console.log(res)
      if (res.data.ActionType === 'OK') {
        // todo 改变用户信息
        props.userInfoAction(res.data.info)

        store.dispatch({
          type: 'change-first-router',
          payload: false
        })

        navigate('/')
      } else {
        message.warning('用户名密码不匹配')
      }
    })

  }
  const onFinishFaild = (obj: any) => {
    console.log('faild', obj)

  }

  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  // 粒子配置
  const options: any = {
    background: {
      color: {
        value: '#EEEEEE'
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: '#00ADB5'
      },
      links: {
        color: '#00ADB5',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 3,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: 'circle'
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  }




  return (
    <StyledDiv>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded} //当前粒子加载完成后的回调
        options={options}
      />
      <Card title="企业门户网站后台管理系统" style={{ width: '50%' }}>
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFaild}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '👨‍💻请输入用户名' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '🔐请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>


          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={disabled}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </StyledDiv>
  )
}
/* const mapStateToProps = (state: any) => {
  console.log(state.userReducer) 
  return {
    userinfo: state.userReducer.userinfo
  }
} */
const mapDispatchToProps = {
  userInfoAction
}
export default connect(null, mapDispatchToProps)(Login)
