import { combineReducers } from '@reduxjs/toolkit'

import mainReducer from '@pages/main/slice'

const rootReducer = combineReducers({
  main: mainReducer
})

export default rootReducer
