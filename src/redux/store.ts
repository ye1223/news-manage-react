import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import routerReducer from './reducer/routerReducer'
import sidebarReducer from './reducer/sidebarReducer'
import userReducer from './reducer/userReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

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
const reducer = combineReducers({
  routerReducer,
  sidebarReducer,
  userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxThunk)))

export default store