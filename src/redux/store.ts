import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import routerReducer from './reducer/routerReducer'
import sidebarReducer from './reducer/sidebarReducer'
import userReducer from './reducer/userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

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
const persistConfig = {
  key: 'mykey',
  storage, // 存入localStorage
  // blacklist: ['userReducer'] // userReducer 将不被被持久化
}
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(reduxThunk)))
const persistor = persistStore(store)

export {
  store,
  persistor
}