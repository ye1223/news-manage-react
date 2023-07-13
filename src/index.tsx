import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css'
import './util/axios.config'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'antd';
import { theme } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const validateMessages = {
  required: "'${name}' 需要填写"
}
root.render(
  <ConfigProvider
    // theme={{ algorithm: theme.defaultAlgorithm }}
    form={{ validateMessages }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
