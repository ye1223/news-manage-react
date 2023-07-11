export interface IProductInfo {
    detail: string
    editTime: string
    introduction: string
    productCover: string
    title: string
    _id: string
    key: string
}

export interface IReturnProductInfo {
    ActionType: string
}

export interface IReturnProductList {
    ActionType: string
    productList: IProductInfo[]
}

export interface IReturnProductDelete {
    ActionType: string
}

export interface IReturnProductEdit {
    ActionType: string
}