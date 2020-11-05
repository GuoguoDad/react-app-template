import React from 'react';
import { Button } from 'antd-mobile';
import './item.less';

import GoodsImg from '@assets/images/goods_img.png';
import DeleteIcon from '@assets/images/delete.png';
import { UnpackGoods } from '../types';

const Item = (props: ItemProps) => {
  const { data, toUnpackPackage, toDel } = props;
  const { mainGoodsInfo, subGoodsInfo, proportion } = data || {};

  const renderMainGoods = () => {
    return (
      <div className="goods">
        <img className="goods_img" src={GoodsImg} />
        <div className="right_container">
          <div className="goods_name row">
            <div className="goods_name_txt row">{mainGoodsInfo.goodsName}</div>
            <div className="edit_container row">
              <img onClick={() => toDel()} className="edit_icon" src={DeleteIcon} />
            </div>
          </div>
          <div className="barCode">条形码: {mainGoodsInfo.barCode}</div>
          <div className="inventoryNum">库存：{mainGoodsInfo.inventoryNum}</div>
          <div className="retailPrice">￥{mainGoodsInfo.retailPrice}</div>
        </div>
      </div>
    );
  };

  const renderSubGoodsInfo = () => {
    return (
      <div className="goods">
        <img className="goods_img" src={GoodsImg} />
        <div className="right_container">
          <div className="goods_name row">
            <div className="goods_name_txt row">{subGoodsInfo.goodsName}</div>
            <div className="edit_container row">
              <div className="proportion">1 : {proportion}</div>
            </div>
          </div>
          <div className="barCode">条形码: {subGoodsInfo.barCode}</div>
          <div className="inventoryNum">库存：{subGoodsInfo.inventoryNum}</div>
          <div className="retailPrice row">
            <span>￥{subGoodsInfo.retailPrice}</span>
            <Button onClick={() => toUnpackPackage()} className="btn center" type="primary">
              去拆包
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="item_container">
      {renderMainGoods()}
      <hr className="separatorLine" />
      {renderSubGoodsInfo()}
    </div>
  );
};
export type ItemProps = {
  data: UnpackGoods;
  sectionID: string | number;
  rowID: string | number;
  toUnpackPackage: Function;
  toDel: Function;
};
export default Item;
