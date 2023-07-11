import React, { useEffect, useMemo, useState } from 'react'
import { Card, Avatar, Carousel } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import process from 'process'
import { adminapi } from '../../api'
import { IProductInfo, IReturnProductList } from '../../types/product'
const contentStyle: React.CSSProperties = {
  // height: '160px',
  color: '#fff',
  width: '70%',
  // lineHeight: '160px',
  margin: '0 auto',
  textAlign: 'center',
  background: '#364d79',
};

export default function Home() {
  const userinfo = useSelector((state: RootState) => state.userReducer.userinfo)
  // 如果存在后端返回有头像地址，则用使用，否则使用默认的头像地址
  const avartarUrl = useMemo(() => userinfo.avatarPath ? `${process.env.REACT_APP_SERVER_URL}${userinfo.avatarPath}` : 'https://s2.loli.net/2023/07/06/gn5vemsfkXpac98.jpg', [userinfo])

  const [productList, setproductList] = useState<IProductInfo[]>([])
  const serverurl = process.env.REACT_APP_SERVER_URL


  // useEffect 接收的回调函数会在每次渲染后执行。它并非等待 async 函数完成后再执行其他效果,这会破坏 React 的同步渲染机制。
  useEffect(() => {
    adminapi.getProductList().then(res => res.data).then((res: IReturnProductList) => {
      if (res.ActionType === 'OK') {
        console.log(productList)
        setproductList(res.productList)
      }
    })
  }, [])
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: '',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    }}>
      <div style={{
        display: 'flex',

      }}>
        <Card style={{ width: '90%', margin: '20px auto', }}>
          <div>
            <Avatar src={avartarUrl} style={{ verticalAlign: 'middle' }} />
            <span style={{ fontSize: '20px' }}>欢迎回来</span>
          </div>
        </Card>
      </div>


      <div >
        <h2 style={{ color: '#000' }}>公司产品</h2>
        <Carousel autoplay>

          {
            productList.map(item => (
              <div key={item._id} style={{ width: '50%', margin: '0 auto' }}>
                {/* <img src={`${serverurl}${item.productCover}`} style={{width: '100%', display:'block'}} /> */}
                <div style={{
                  background: `url(${serverurl}${item.productCover})`,
                  width: '70%',
                  height: '320px',
                  backgroundSize: 'cover',
                  margin: '0 auto'
                }}></div>

                <h3 style={contentStyle}>{item.title}</h3>
              </div>
            ))
          }

        </Carousel>
      </div>
    </div>
  )
}
