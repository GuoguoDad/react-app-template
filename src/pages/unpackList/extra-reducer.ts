import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { queryUnpackListAsync, submitUnpackPackageAsync } from './actor';
import { UnpackingState } from './store';

export const extraReducers = (builder: ActionReducerMapBuilder<UnpackingState>) => {
  //queryUnpackListAsync 下拉刷新，上拉加载更多逻辑
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
  }),
  //拆包操作防止重复点击，提示信息
  builder.addCase(submitUnpackPackageAsync.pending,(state, { meta })=>{
    if (state.unpackingFlag === 'idle') {
      state.unpackingFlag = 'pending';
      state.currentRequestId = meta.requestId;
    }
  }),
  builder.addCase(submitUnpackPackageAsync.fulfilled, (state, { payload, meta })=> {
    if (state.unpackingFlag === 'pending' && state.currentRequestId === meta.requestId) {
      state.unpackingFlag = 'idle'
      state.showUnpackingModal = false
      state.showUnpackingResultModal = true
      state.unpackingSuccess = true
      state.currentRequestId = ''
    }
  }),
  builder.addCase(submitUnpackPackageAsync.rejected, (state, { payload, meta, error }) => {
    if (state.unpackingFlag === 'pending' && state.currentRequestId === meta.requestId) {
      state.unpackingFlag = 'idle'
      const msg = payload as string;
      state.showUnpackingModal = false
      state.showUnpackingResultModal = true
      state.unpackingSuccess = false
      state.unpackingMsg = msg ?? error?.message ?? ''
      state.currentRequestId = ''
    }
  })
} 