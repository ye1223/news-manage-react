import axios from "axios"

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么

    // >获取token 设置更新token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearea ${token}`
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    // >响应成功-更新token
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem('token')
        // todo hash地址值？
        window.location.href = '#/login'
    }

    return Promise.reject(error)
})