import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './rootReducer'

const middleware = process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
