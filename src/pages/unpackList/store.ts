import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extraReducers } from './extra-reducer';
import { UnpackGoods } from './types';

export interface UnpackingState {
  dataList: UnpackGoods[]; //拆包关系列表数据
  keywork: string; //搜索关键词
  currentPage: number; //当前页码
  isLoading: boolean; //是否加载中
  refreshing: boolean; //是否下拉刷新中
  hasMore: boolean;//是否有更多数据

  showUnpackingModal: boolean; //是否显示拆包底部弹窗
  unpackingModalData: UnpackGoods;//当前正在拆包的数据
  unpackingFlag: string; //防止拆包重复点击flag
  currentRequestId: string;//防止拆包重复点击reqId

  showUnpackingResultModal: boolean;  //是否显示拆包操作弹窗
  unpackingSuccess: boolean;//拆包操作是否成功
  unpackingMsg: string;//拆包失败提示语
}

const initialState: UnpackingState = {
  dataList: [],
  keywork: '',
  currentPage: 1,
  isLoading: false,
  refreshing: true,
  hasMore: true,

  showUnpackingModal: false,
  unpackingModalData: {} as UnpackGoods,
  unpackingFlag: 'idle',
  currentRequestId: '',
  
  showUnpackingResultModal: false,
  unpackingSuccess: false,
  unpackingMsg:''
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
    setShowUnpackingModal: (state, action: PayloadAction<{show: boolean, data?: UnpackGoods}>) => {
      const { show, data } = action.payload
      state.showUnpackingModal = show
      state.unpackingModalData = data || {} as UnpackGoods
    },
    setShowResultModal: (state, action: PayloadAction<boolean>) => {
      state.showUnpackingResultModal = action.payload
    },
  },
  extraReducers
})

export const { setKeywork, setCurrentPage, pullRefresh, setShowUnpackingModal, setShowResultModal} = unpackListSlice.actions;
export default unpackListSlice.reducer;