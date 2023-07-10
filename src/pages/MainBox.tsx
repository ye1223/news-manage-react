import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from '../component/Main/Sidebar'
import Topbar from '../component/Main/Topbar'
import { connect } from 'react-redux'
import { collapseAction } from '../redux/actionCreator/sidebarActionCreator'

const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  // color: '#fff',
  height: '64px',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
  display: 'block'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  // lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#108ee9',
  overflow: 'auto'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  // backgroundColor: '#3ba0e9',
};

interface IProps {
  collapse: boolean
}

function MainBox(props: IProps) {
  /*  useEffect(() => {
     axios.get('/adminapi/user/list').then(res=>{
       console.log(res)
     }).catch(e=>{
       console.log(e)
     })
   }) */

  const [collapse, setcollapse] = useState<boolean>(false)
  useEffect(() => {
    setcollapse(props.collapse)
  }, [props.collapse])

  return (
    <div>
      <Layout style={{ height: '100vh' }}>
        {/* //todo */}
        <Sider style={siderStyle} collapsed={collapse}>
          <h2>管理系统</h2>
          <Sidebar />
        </Sider>

        <Layout>
          <Header style={headerStyle}>
            <Topbar />
          </Header>

          <Content style={contentStyle}>
            <Outlet />
          </Content>

        </Layout>
      </Layout>

    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    collapse: state.sidebarReducer.isCollapsed
  }
}
// const mapDispatchToProps = {
//   collapseAction
// }

export default connect(mapStateToProps)(MainBox)
