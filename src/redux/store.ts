import { createStore } from 'redux'


/* 
    isGetAllRouters:false,//路由是否全部加载进页面
    isCollapsed:false ,//Side页是否收回
    userInfo:{},


    changeGetAllRouters(state,value){
      state.isGetAllRouters = value
    },
    //控制侧边栏收缩/展开
    changeCollapse(state){
      state.isCollapsed = !state.isCollapsed
    },
*/
const reducer: any = (prevState = {
    isFirstLoadAllRouters: false
}, action = {}) => {
    
}

const store = createStore(reducer)

export default store