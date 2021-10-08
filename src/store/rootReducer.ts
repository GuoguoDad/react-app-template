import { combineReducers } from '@reduxjs/toolkit'

import counterReducer from '../pages-demo/counter/counterSlice'
import booksReducer from '../pages-demo/books/booksSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  books: booksReducer
})

export default rootReducer
