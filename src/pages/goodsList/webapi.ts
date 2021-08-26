import { Fetch } from '../../kits'
import { GoodsList, QueryListParam } from './types'

export const queryStoreGoodsList = (params: QueryListParam) => {
  return Fetch.post<GoodsList>('http://localhost:8090/goods/queryStoreGoodsList', params)
}
