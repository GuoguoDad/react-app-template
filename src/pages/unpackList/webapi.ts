import { Fetch } from '../../kits';
import { unpackGoodsPageList, PageParam } from './types';

export const queryUnpackListByPage = (params: PageParam) => {
  return Fetch.post<unpackGoodsPageList>('http://localhost:8090/api/unpack/list', params)
}

