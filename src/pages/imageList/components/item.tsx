import React from 'react'
import { Image } from '@comps'
import styles from './item.module.less'

const Item = (props: {url: string, onClickFun?: Function}) => {
  const {url , onClickFun =()=>{}} = props

  return (
    <div className={styles.item_container} onClick={()=>onClickFun()}>
      <Image lazy className={styles.goods_img} url={ url } />
    </div>
  )
}



export default Item


