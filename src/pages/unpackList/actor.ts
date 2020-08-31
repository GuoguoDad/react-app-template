import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { queryUnpackListByPage } from './webapi';
import { unpackGoodsPageList, queryListParam } from './types';

export const queryUnpackListAsync = createAsyncThunk<unpackGoodsPageList, queryListParam, { state: RootState }>(
  'qeryUnpackList',
  async (params) => {
    const { data } = await queryUnpackListByPage(params)
    return data;
  }
)