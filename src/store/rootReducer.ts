import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../pages-demo/counter/counterSlice';
import booksReducer from '../pages-demo/books/booksSlice';
import unpackListReducer from '../pages/unpackList/store';

const rootReducer = combineReducers({
  counter: counterReducer,
  books: booksReducer,
  unpacks: unpackListReducer
})

export default rootReducer