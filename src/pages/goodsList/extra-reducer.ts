import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { queryStoreGoodsListAsync } from './actor'
import { GoodsListState } from './store'

export const extraReducers = (builder: ActionReducerMapBuilder<GoodsListState>) => {
  // queryUnpackListAsync 下拉刷新，上拉加载更多逻辑
  builder.addCase(queryStoreGoodsListAsync.pending, (state) => {
    state.isLoading = true
  }),
    builder.addCase(queryStoreGoodsListAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false
      if (state.refreshing) {
        state.dataList = state.dataList = payload.dataList
      } else {
        state.dataList = state.dataList.concat(payload.dataList)
      }
      if (state.currentPage >= payload.totalPageCount || payload.dataList.length === 0) {
        state.hasMore = false
      } else {
        state.hasMore = true
      }
      if (state.refreshing) {
        state.refreshing = false
      }
    }),
    builder.addCase(queryStoreGoodsListAsync.rejected, (state) => {
      state.isLoading = false
    })
}
