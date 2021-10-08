import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'antd-mobile/es/global'
import 'babel-polyfill'
import './index.less'

import { store } from './store'
import Routes from './routes'

ReactDOM.render(
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
  </>,
  document.getElementById('root')
)
