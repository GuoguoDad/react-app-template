import React from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import BackImg from '@assets/images/back.png'

export const Header = (props: HeaderProps) => {
  const { hasBack = false, backFun = () => {}, title, showRight = false, rightTxt, rightFun = () => {} } = props

  return (
    <div className={styles.com_header}>
      <div onClick={() => backFun()} className={styles.left}>
        {hasBack ? <img className={styles.back_icon} src={BackImg} /> : <div />}
      </div>
      <div className={classNames(styles.middle, styles.alignCenter)}>{title}</div>
      {showRight ? (
        <div onClick={() => rightFun()} className={classNames(styles.right, styles.centerRight)}>
          {rightTxt}
        </div>
      ) : (
        <div className={styles.right} />
      )}
    </div>
  )
}

export type HeaderProps = {
  hasBack?: boolean; // 是否有返回
  backFun?: Function; // 返回点击事件
  title: string; // 中间标题
  showRight?: boolean; // 右边操作
  rightTxt?: string; // 右边操作文案
  rightFun?: Function; // 右边操作事件
};
