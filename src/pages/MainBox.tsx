import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FloatButton, Layout } from 'antd'
import Sidebar from '../component/Main/Sidebar'
import Topbar from '../component/Main/Topbar'
import { connect, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ThemeMode } from '../types/theme'
import { BulbTwoTone } from '@ant-design/icons'
import useThemeColor from '../hooks/useThemeColor'

const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  // color: '#fff',
  height: '64px',
  paddingInline: 50,
  lineHeight: '64px',
  // backgroundColor: '#7dbcea',
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
  // backgroundColor: 'rgb(30, 37,51)',
  // height: '64px'
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
  const themeMode = useSelector((state: RootState) => state.themeReducer.themeMode)
  const iscollapsed = useSelector((state: RootState) => state.sidebarReducer.isCollapsed)
  const dispatch = useDispatch<AppDispatch>()
  const color = (themeMode === ThemeMode.LIGHT ? '#000' : '#fff')

  const style = useThemeColor()
  const [collapse, setcollapse] = useState<boolean>(false)
  useEffect(() => {
    setcollapse(props.collapse)
  }, [props.collapse])

  return (
    <div>
      <Layout style={{ height: '100vh' }}>
        {/* //todo */}
        <Sider style={siderStyle} collapsed={collapse} theme={themeMode === ThemeMode.LIGHT ? 'light' : 'dark'}>
          <h2  style={{ color, visibility: `${!iscollapsed ? 'visible' : 'hidden'}` }}>管理系统</h2>
          <Sidebar />
        </Sider>

        <Layout>
          <Header style={{ ...headerStyle, backgroundColor: `${themeMode === ThemeMode.LIGHT ? '#fff' : 'rgb(5,21,39, 0.9)'}` }}>
            <Topbar />
          </Header>

          <Content style={{...contentStyle}}>
            <Outlet />
          </Content>

        </Layout>
      </Layout>
      <FloatButton icon={<BulbTwoTone twoToneColor={themeMode === ThemeMode.LIGHT ? '' : '#434343'} />} onClick={() => {
        console.log(themeMode)
        dispatch({
          type: 'switch-theme-mode',
          payload: themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
        })
      }} />
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
