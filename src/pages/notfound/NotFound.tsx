import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="对不起，你访问的页面不存在"
        extra={<Button type="primary" onClick={()=>{
          navigate(-1)
        }}>返回</Button>}
      />
    </div>
  )
}
