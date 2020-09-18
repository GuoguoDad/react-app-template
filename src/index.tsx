import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.less';

import { store } from './store';
import reduxStore from './pages-demo/counter2/store';
import Routes from './routes';

ReactDOM.render(
  <React.Fragment>
    <Provider store={reduxStore}>
      <Routes />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
