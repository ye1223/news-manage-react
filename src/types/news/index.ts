export interface INewsInfo {
    title: string, //标题
    content: string, //内容
    category: number, //1最新动态 2典型案例 3通知公告
    coverPath: string, //封面地址信息
    file?: any, //提交给后端二进制文件
    isPublish: number, //0未发布 1已发布
    userID: string
}