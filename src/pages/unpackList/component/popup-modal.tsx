import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Stepper, Button } from 'antd-mobile';

import { RootState } from '../../../store';
import { setShowUnpackingModal } from '../store';
import './popup-modal.less';
import { submitUnpacking } from '../webapi';

import packageIcon from 'images/package_icon.png';
import subGoodsIcon from 'images/subgoods_iocn.png';
import ArrowDown from 'images/arrow_down.png';

const unpackingModal = () => {
  const {showUnpackingModal, unpackingModalData } = useSelector((state: RootState) => state.unpacks)

  const dispatch = useDispatch();

  const [mainGoodsToUnpackNum, setMainGoodsToUnpackNum] = useState<number>(1)


  const close = () => {
    dispatch(setShowUnpackingModal({show: false, data: unpackingModalData }))
  }

  const renderHeader = () => {
    return (
      <div className="header">
        <div className="item center"></div>
        <div className="middle center">
          拆包
        </div>
        <div onClick={()=> close()} className="item center">
          <a>关闭</a>
        </div>
      </div>
    )
  }


  const renderMainGoods = () => {
    return (
      <div className="main-goods-info-contanier">
        <div className="goods-info-item row">
          <img className= "main-goods-icon" src={packageIcon}/>
          <div className= "main-goods-name">
            {unpackingModalData?.mainGoodsInfo?.goodsName ?? ''}
          </div>
        </div>
        <div className="goods-info-item row align-items-center just-content-space-between">
          <span className="inventory-num">库存: {unpackingModalData?.mainGoodsInfo?.inventoryNum ?? 0}</span>
          <Stepper
            showNumber
            max={unpackingModalData?.mainGoodsInfo?.inventoryNum ?? 0}
            min={1}
            value={mainGoodsToUnpackNum}
            className="stepper"
            onChange={(va) => setMainGoodsToUnpackNum(va)}
          />
        </div>
      </div>
    )
  }

  const proportion = unpackingModalData?.proportion ?? 0
  const subNum = proportion *  mainGoodsToUnpackNum
  const renderSubGoodsInfo = () => {
    return (
      <>
        <div className="main-goods-info-contanier second-container">
          <div className="goods-info-item row">
            <img className= "main-goods-icon" src={subGoodsIcon}/>
            <div className= "main-goods-name">
              {unpackingModalData?.subGoodsInfo?.goodsName ?? ''}
            </div>
          </div>
          <div className="goods-info-item row align-items-center just-content-space-between">
            <span className="inventory-num">现有库存: {unpackingModalData?.subGoodsInfo?.inventoryNum ?? 0}</span>
            <span className="generate-txt">生成数: <span className="generate-num">{ subNum }</span></span>
          </div>
        </div>
        <span className="unpacking-relation">整件和散件的拆包配比关系为1:{proportion}</span>
      </>
    )
  } 

  const submit = async () => {
    const param = {
      storeCode: '',
      mainGoodsCode: unpackingModalData?.mainGoodsInfo?.goodsCode,
      subGoodsCode: unpackingModalData?.subGoodsInfo?.goodsCode,
      mainNum: mainGoodsToUnpackNum.toString(),
      subNum: subNum.toString(),
      proportion: proportion.toString()
    }
    const res = await submitUnpacking(param)
    if(res.code === 0){

    }
  } 

  return (
    <Modal
      popup
      visible={showUnpackingModal}
      onClose={()=> close()}
      animationType="slide-up"
      className="unpacking-popup-container"
    >
      {renderHeader()}
      {renderMainGoods()}
      <div className="row center"><img className="arrow_donw" src={ArrowDown}/></div>
      {renderSubGoodsInfo()}
      <Button onClick={() => submit()} className="sure-btn" type="primary">确定</Button>
    </Modal>
  )
}

export type PopupProps = {
  visible: boolean
}

export default unpackingModal