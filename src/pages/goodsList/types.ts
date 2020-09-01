export type Goods = {
  goodsCode: string; //商品编号
  imageList: string[]; //列表图片
  goodsName: string; //商品名称
  barCode: string; //条形码
  inventoryNum: number; //库存
  retailPrice: number; //价格
}

export type GoodsList = {
  dataList: Array<Goods>,
  totalCount: number,
  totalPageCount: number
}


export interface PageParam {
  pageNum: number;
  pageSize: number;
}

export interface QueryListParam extends PageParam {
  storeCode: string;
  keyWord?: string;
}