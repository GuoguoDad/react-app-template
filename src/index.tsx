import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import './index.less';

import { store } from './store';
// import reduxStore from './pages-demo/counter2/store';
import Routes from './routes';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
