import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { Counter } from './counter/Counter'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <Counter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
