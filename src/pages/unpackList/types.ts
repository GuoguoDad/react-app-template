export type Goods = {
  imageList: string[]; //列表图片
  goodsName: string; //商品名称
  barCode: string; //条形码
  inventoryNum: number; //库存
  retailPrice: number; //价格
}

export type unpackGoods = {
  ruleId: string;
  mainGoodsInfo: Goods, //大包装商品
  subGoodsInfo: Goods, //小包商品
  proportion: number; //配比，1:n
  type: number; // 1-标品，2-计件
}

export type unpackGoodsPageList = {
  dataList: Array<unpackGoods>,
  totalCount: number,
  totalPageCount: number
}

export interface PageParam {
  pageNo: number;
  pageSize: number;
}

export interface queryListParam extends PageParam{
  keyword?: string;
}