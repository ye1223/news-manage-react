import axios from "axios"
import { IUserInfo } from "../../types/user"
interface LoginForm {
    username: string,
    password: string
}

export const login = async (url: string, form: LoginForm) => {
    return await axios.post(url, form)
}

export const getProductList = async () => {
    return await axios({
        method: 'GET',
        url: '/adminapi/product/lists',
        // headers:{
        //     "Content-Type": "img/png"
        // }
    })
}
export const upload = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/user/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 添加用户
export const addUser = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/user/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getUserList = () => {
    return axios.get('/adminapi/user/list')
}

export const deleteUser = async (id: string) => {
    return axios.delete(`/adminapi/news/list/${id}`)
}

export const updateUser = (Form: any) => {
    console.log('axiosssss',Form)
    return axios.put(`/adminapi/user/list/${Form._id}`, Form)
}

export const addProduct = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/product/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const addNews = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/news/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}