import axios from "axios"
interface LoginForm {
    username: string,
    password: string
}

export const login = async (url: string, form: LoginForm) => {
    return await axios.post(url, form)
}