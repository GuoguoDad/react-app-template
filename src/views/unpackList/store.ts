import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queryUnpackListAsync } from './actor';
import { unpackGoods } from './types';

interface CounterState {
  dataList: unpackGoods[];
  keywork: string;
  currentPage: number;
  isLoading: boolean;
  hasMore: boolean;
}

const initialState: CounterState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  hasMore: true
}

export const unpackListSlice = createSlice({
  name: 'unpacking',
  initialState,
  reducers: {
    setKeywork: (state, action: PayloadAction<string>) => {
      state.keywork = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(queryUnpackListAsync.pending, (state) => {
      state.isLoading = true
    }),
    builder.addCase(queryUnpackListAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.dataList = state.dataList.concat(payload.dataList)
      if(state.currentPage >= payload.totalPageCount || payload.dataList.length === 0){
        state.hasMore = false
      }
      state.currentPage += 1
    }),
    builder.addCase(queryUnpackListAsync.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setKeywork } = unpackListSlice.actions;
export default unpackListSlice.reducer;