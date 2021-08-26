import React from 'react'
import { Image } from '@comps'
import styles from './item.module.less'

const Item = (props: {url: string}) => {
  const {url} = props

  return (
    <div className={styles.item_container}>
      <Image lazy className={styles.goods_img} url={ url } />
    </div>
  )
}



export default Item


