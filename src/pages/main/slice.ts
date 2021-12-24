import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState } from '@pages/main/type'

const initialState: InitialState = {
  currentTab: 'home'
}

const MainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<{ [key: string]: unknown }>) => {
      const obj = action.payload
      Object.keys(obj).forEach(key=>{
        // @ts-ignore
        state[key] = obj[key]
      })
    }
  }
})

export const { setState } = MainSlice.actions

export default MainSlice.reducer

