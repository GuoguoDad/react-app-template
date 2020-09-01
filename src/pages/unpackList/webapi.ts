import { Fetch } from '../../kits';
import { unpackGoodsPageList, queryListParam, submitUnpackingParam } from './types';

export const queryUnpackListByPage = (params: queryListParam) => {
  return Fetch.post<unpackGoodsPageList>('http://localhost:8090/api/unpacking/queryUnpackingRuleList', params)
}

export const submitUnpacking = (params: submitUnpackingParam) => {
  return Fetch.post<string>('http://localhost:8090/api/unpacking/submitUnpacking', params);
}