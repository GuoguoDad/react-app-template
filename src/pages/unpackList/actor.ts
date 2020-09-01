import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { queryUnpackListByPage, submitUnpacking } from './webapi';
import { UnpackGoodsPageList, QueryListParam, SubmitUnpackingParam } from './types';

export const queryUnpackListAsync = createAsyncThunk<UnpackGoodsPageList, QueryListParam, { state: RootState }>(
  'qeryUnpackList',
  async (params) => {
    const { data } = await queryUnpackListByPage(params)
    return data;
  }
)

export const submitUnpackPackageAsync = createAsyncThunk<string,  SubmitUnpackingParam, {state: RootState}> (
  'submitUnpackPackage',
  async (params, { getState, requestId, rejectWithValue }) => {
    const { unpackingFlag, currentRequestId } = getState().unpacks
    
    if(unpackingFlag !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue(`重复请求中requestId:${requestId}`)
    }

    const res = await submitUnpacking(params)
    return res.data
  }
)