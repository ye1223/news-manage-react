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
    
    console.log(Form ,'formdata', formData)

    return await axios.post('/adminapi/user/upload', formData, {
        // method: 'POST',
        // url: '/adminapi/user/upload',
        // params: FD,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}