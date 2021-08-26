import { combineReducers } from '@reduxjs/toolkit'

import counterReducer from '../pages-demo/counter/counterSlice'
import booksReducer from '../pages-demo/books/booksSlice'
import unpackListReducer from '../pages/unpackList/store'
import goodsListReducer from '../pages/goodsList/store'

const rootReducer = combineReducers({
  counter: counterReducer,
  books: booksReducer,
  unpacks: unpackListReducer,
  goods: goodsListReducer,
})

export default rootReducer
