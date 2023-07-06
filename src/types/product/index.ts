export interface IProductInfo {
    detail: string
    editTime: string
    introduction: string
    productCover: string
    title: string
    _id: string
}

export interface IReturnProduct {
    ActionType: string
    productList: IProductInfo[]
}