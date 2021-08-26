import React, { useRef, useState } from 'react'
import { useInViewport } from 'ahooks'
import { Image } from '@comps'
import styles from './item.module.less'

const goods = 'http://oss.suning.com/sffe/sffe/goods.png'

const Item = (props: {url: string}) => {
  const {url} = props
  const ref = useRef<HTMLDivElement>(null)
  const inViewPort = useInViewport(ref)

  return (
    <div ref={ref} className={styles.item_container}>
      <Image className={styles.goods_img} url={ inViewPort ? goods : url } />
    </div>
  )
}



export default Item


