import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queryUnpackListAsync } from './actor';
import { unpackGoods } from './types';

interface CounterState {
  dataList: unpackGoods[];
  keywork: string;
  currentPage: number;
  isLoading: boolean;
  refreshing: boolean;
  hasMore: boolean;
}

const initialState: CounterState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  refreshing: false,
  hasMore: true
}

export const unpackListSlice = createSlice({
  name: 'unpacking',
  initialState,
  reducers: {
    setKeywork: (state, action: PayloadAction<string>) => {
      state.keywork = action.payload
    },
    pullRefresh: (state) => {
      state.refreshing = true
      state.currentPage = 1
    },
  },
  extraReducers: builder => {
    builder.addCase(queryUnpackListAsync.pending, (state) => {
      state.isLoading = true
    }),
    builder.addCase(queryUnpackListAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false
      if(state.refreshing) {
        state.dataList = state.dataList = payload.dataList
      }else{
        state.dataList = state.dataList.concat(payload.dataList)
      }
      if(state.currentPage >= payload.totalPageCount || payload.dataList.length === 0){
        state.hasMore = false
      }else{
        state.hasMore = true
      }
      state.currentPage += 1
      if(state.refreshing){
        state.refreshing = false
      }
    }),
    builder.addCase(queryUnpackListAsync.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setKeywork, pullRefresh } = unpackListSlice.actions;
export default unpackListSlice.reducer;