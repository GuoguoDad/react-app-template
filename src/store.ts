import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reduxBatch }  from '@manaflair/redux-batch';
import logger from 'redux-logger';

import counterReducer from './apps/counter/counterSlice';
import booksReducer from './apps/books/booksSlice';

const middleware = getDefaultMiddleware().concat(logger);
const reducer =  {
  counter: counterReducer,
  books: booksReducer
}

export const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch]
})

export type RootState = ReturnType<typeof store.getState>;