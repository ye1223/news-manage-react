import { useEffect, useState } from "react"
import { IUserInfo } from "../types/user"

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}
const useFormFields = (userinfo: IUserInfo) => {

    // 存储这样的键值{ name: ['username'], value: 'Ant Design' }
    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        setFields(MapInfoToFields(userinfo))
    }, [userinfo])

    return fields
}

// 将redux中的用户信息map成setFields接受的键值格式
const MapInfoToFields = (userinfo: IUserInfo) => {
    // [{ name: ['username'], value: 'Ant Design' }]
    const fieldsArr = []
    for (let key in userinfo) {
        fieldsArr.push({
            name: [`${key}`],
            value: (userinfo as any)[key]
        })
    }
    // console.log('fieldsArr', fieldsArr)
    return fieldsArr
}

export default useFormFields