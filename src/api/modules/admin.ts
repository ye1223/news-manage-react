import axios from "axios"
import { IUserInfo } from "../../types/user"
interface LoginForm {
    username: string,
    password: string
}

export const login = async (url: string, form: LoginForm) => {
    return await axios.post(url, form)
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
    console.log('axiosssss', Form)
    return axios.put(`/adminapi/user/list/${Form._id}`, Form)
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

// 根据权限判断当前用户ID
export const getNewsList = (id: string) => {
    return axios.get(`/adminapi/news/lists/${id}`)
}

export const getNews = (newsid: string) => {
    return axios.get(`/adminapi/news/list/${newsid}`)
}

export const handleNewsPublish = (isPublish: boolean, newsid: string) => {
    console.log('axios', isPublish ? 1 : 0, newsid)
    return axios.put(`/adminapi/news/publish`, {
        _id: newsid,
        isPublish: isPublish ? 1 : 0
    })
}

export const editNews = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/news/list', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteNews = (newsid: string) => {
    return axios.delete(`/adminapi/news/list/${newsid}`)
}

export const getProductList = async () => {
    return await axios({
        method: 'GET',
        url: '/adminapi/product/lists',
    })
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

export const deleteProduct = (productid: string) => {
    return axios.delete(`/adminapi/product/list/${productid}`)
}

export const getProduct = (productid: string) => {
    return axios.get(`/adminapi/product/list/${productid}`)
}

export const editProduct = async (Form: any) => {
    const formData = new FormData()
    for (let key in Form) {
        formData.append(key, Form[key])
    }
    return await axios.post('/adminapi/product/list', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}