import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'antd-mobile/es/global'
import 'babel-polyfill'
import './index.less'

import { store } from './store'
import App from './app'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
