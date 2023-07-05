import React, { useEffect } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

export default function MainBox() {
  useEffect(() => {
    axios.get('/adminapi/user/list').then(res=>{
      console.log(res)
    }).catch(e=>{
      console.log(e)
    })
  })
  return (
    <div>MainBox
      <Outlet />
    </div>
  )
}
