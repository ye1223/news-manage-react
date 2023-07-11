import { useEffect, useState } from "react"
import { IUserInfo } from "../types/user"
import { INewsInfo } from "../types/news";
import { IProductInfo } from "../types/product";

export interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}
const useFormFields = (info: IUserInfo | INewsInfo | IProductInfo) => {

    // 存储这样的键值{ name: ['username'], value: 'Ant Design' }
    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        setFields(MapInfoToFields(info))
    }, [info])

    return fields
}

// 将redux中的用户信息map成setFields接受的键值格式
export const MapInfoToFields = (info: IUserInfo | INewsInfo | IProductInfo) => {
    // [{ name: ['username'], value: 'Ant Design' }]
    const fieldsArr = []
    for (let key in info) {
        fieldsArr.push({
            name: [`${key}`],
            value: (info as any)[key]
        })
    }
    // console.log('fieldsArr', fieldsArr)
    return fieldsArr
}

export default useFormFields