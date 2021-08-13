import { Fetch } from '../../kits';
import { UnpackGoodsPageList, QueryListParam, SubmitUnpackingParam } from './types';

export const queryUnpackListByPage = (params: QueryListParam) => {
  return Fetch.post<UnpackGoodsPageList>('http://localhost:8090/unpacking/queryUnpackingRuleList', params);
};

export const submitUnpacking = (params: SubmitUnpackingParam) => {
  return Fetch.post<string>('http://localhost:8090/unpacking/submitUnpacking', params);
};
