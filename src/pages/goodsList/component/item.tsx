import React from 'react';

import './item.less';
import { Goods } from '../types';
import GoodsImg from '@assets/images/goods_img.png';

export const GoodsListItem = (rowData: Goods, sectionID: string | number, rowID: string | number) => {
  return (
    <div className="item_container" >
      <div className="goods">
        <img className="goods_img" src={GoodsImg} />
        <div className="right_container">
          <div className="goods_name row">
              <div className="goods_name_txt row">{rowData.goodsName}</div>
          </div>
          <div className="barCode">条形码: {rowData.barCode}</div>
          <div className="inventoryNum">库存：{rowData.inventoryNum}</div>
          <div className="retailPrice">￥{rowData.retailPrice}</div>
        </div>
      </div>
    </div>
  );
};