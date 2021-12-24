import React ,{ useEffect } from 'react'
import { useIonRouter } from '@ionic/react'
import { InfiniteScroll, List } from 'antd-mobile'
import { useSetState } from 'ahooks'
import { Scene } from '@comps'
import {
  add, add_active,
  add_disabled, arrowDown, arrowRight, backBlack, backWhite, arrowUp,
  coupon_card_content, banner, bottomBg, couponRed, fire, more, coupon_card_grey
} from '@img'
import styles from './index.module.less'
import './index.less'


const imgList = () => {
  const history = useIonRouter()
  const [state] = useSetState<{ dataList: Array<string>, isLoading: boolean, hasMore: boolean, refreshing: boolean }>
  ({
    dataList: ['http://oss.suning.com/sffe/sffe/goods.png',
      add,add_active,add_disabled,arrowDown,arrowRight,backBlack,backWhite,arrowUp,coupon_card_content,
      banner, bottomBg,couponRed,fire,more,coupon_card_grey], isLoading: false, hasMore: true, refreshing: true })

  useEffect(()=>{
    console.log('=========imgList')
  },[])

  return (
    <Scene title="图片列表" onLeftClick={() => history.goBack()}>
        <div className={styles.infiniteList}>
          <List>
            {state.dataList.map((item, index) => (
              <div key={index} className={styles.item_container} onClick={()=> history.push('/imgDetail') }>
                <img alt={''} className={styles.goods_img} src={item}/>
              </div>
            ))}
          </List>
          <InfiniteScroll loadMore={async () => {}} hasMore={state.hasMore} />
        </div>
    </Scene>
  )
}

export default imgList
