import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queryUnpackListAsync } from './actor';
import { unpackGoods } from './types';

interface CounterState {
  dataList: unpackGoods[];
  keywork: string;
  currentPage: number;
  isLoading: boolean;
  pullRefresh: boolean;
}

const initialState: CounterState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  pullRefresh: false
}

export const unpackListSlice = createSlice({
  name: 'unpacking',
  initialState,
  reducers: {
    refresh: state => {
      state.pullRefresh = true
    },
    endfresh: state => {
      state.pullRefresh = false
    },
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
    }),
    builder.addCase(queryUnpackListAsync.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { refresh, endfresh, setKeywork } = unpackListSlice.actions;
export default unpackListSlice.reducer;