import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'antd-mobile'

import { RootState } from '../../../store'
import { setShowResultModal } from '../store'
import './unpcking-result-modal.less'

import finshIcon from '@assets/images/finsh_icon.png'

const UnpackingResultModal = () => {
  const { showUnpackingResultModal, unpackingSuccess } = useSelector((state: RootState) => state.unpacks)

  const dispatch = useDispatch()

  const close = () => {
    dispatch(setShowResultModal(false))
  }

  const renderHeader = () => {
    return (
      <div className="header">
        <div className="item center" />
        <div className="middle center" />
        <div onClick={() => close()} className="item center">
          <a>关闭</a>
        </div>
      </div>
    )
  }

  const toUnpacking = () => {
    close()
  }

  return (
    <Modal
      popup
      visible={showUnpackingResultModal}
      onClose={() => close()}
      animationType="slide-up"
      className="unpacking-result-container"
    >
      {renderHeader()}
      <div className="content-tips center">
        <img className="finsh-img" src={finshIcon} />
        <span className="finsh-txt">{unpackingSuccess ? '拆包完成' : '拆包失败'}</span>
      </div>
      <Button onClick={() => toUnpacking()} className="sure-btn" type="primary">
        继续拆包
      </Button>
    </Modal>
  )
}

export type PopupProps = {
  visible: boolean;
};

export default UnpackingResultModal
