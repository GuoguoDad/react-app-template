import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { queryUnpackListByPage, submitUnpacking } from './webapi';
import { unpackGoodsPageList, queryListParam, submitUnpackingParam } from './types';

export const queryUnpackListAsync = createAsyncThunk<unpackGoodsPageList, queryListParam, { state: RootState }>(
  'qeryUnpackList',
  async (params) => {
    const { data } = await queryUnpackListByPage(params)
    return data;
  }
)

export const submitUnpackPackageAsync = createAsyncThunk<string,  submitUnpackingParam, {state: RootState}> (
  'submitUnpackPackage',
  async (params) => {
    const res = await submitUnpacking(params)
    return res.data
  }
)