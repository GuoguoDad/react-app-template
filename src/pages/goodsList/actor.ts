import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { queryStoreGoodsList } from './webapi';
import { GoodsList, QueryListParam } from './types';

export const queryStoreGoodsListAsync = createAsyncThunk<GoodsList, QueryListParam, { state: RootState }>(
  'qeryUnpackList',
  async (params) => {
    const { data } = await queryStoreGoodsList(params)
    return data;
  }
)