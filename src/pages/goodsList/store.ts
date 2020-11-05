import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extraReducers } from './extra-reducer';
import { Goods } from './types';

export interface GoodsListState {
  dataList: Goods[]; // 商品列表数据
  keywork: string; // 搜索关键词
  currentPage: number; // 当前页码
  isLoading: boolean; // 是否加载中
  refreshing: boolean; // 是否下拉刷新中
  hasMore: boolean; // 是否有更多数据
}

const initialState: GoodsListState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  refreshing: true,
  hasMore: true,
};

export const goodsListSlice = createSlice({
  name: 'goodsList',
  initialState,
  reducers: {
    setKeywork: (state, action: PayloadAction<string>) => {
      state.keywork = action.payload;
    },
    pullRefresh: (state) => {
      state.refreshing = true;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers,
});

export const { setKeywork, setCurrentPage, pullRefresh } = goodsListSlice.actions;
export default goodsListSlice.reducer;
