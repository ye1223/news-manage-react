// 格式化 新闻编辑时间
import moment from "moment";
moment.locale('zh-cn');
const formatTime = (time: string) => {
    return moment(time).format('YYYY/MM/DD')
}

export default formatTime