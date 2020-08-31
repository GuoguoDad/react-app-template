import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queryUnpackListAsync } from './actor';
import { unpackGoods } from './types';

interface CounterState {
  dataList: unpackGoods[]; //拆包关系列表数据
  keywork: string; //搜索关键词
  currentPage: number; //当前页码
  isLoading: boolean; //是否加载中
  refreshing: boolean; //是否下拉刷新中
  hasMore: boolean;//是否有更多数据
  showUnpackingModal: boolean; //是否显示拆包底部弹窗
  unpackingModalData: unpackGoods;//当前正在拆包的数据
}

const initialState: CounterState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  refreshing: true,
  hasMore: true,
  showUnpackingModal: false,
  unpackingModalData: {} as unpackGoods
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setShowUnpackingModal: (state, action: PayloadAction<{show: boolean, data?: unpackGoods}>) => {
      const { show, data } = action.payload
      state.showUnpackingModal = show
      state.unpackingModalData = data || {} as unpackGoods
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
      if(state.refreshing){
        state.refreshing = false
      }
    }),
    builder.addCase(queryUnpackListAsync.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setKeywork, setCurrentPage, pullRefresh, setShowUnpackingModal} = unpackListSlice.actions;
export default unpackListSlice.reducer;