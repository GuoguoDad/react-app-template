import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useIonRouter } from '@ionic/react'
import { useSetState } from 'ahooks'
import { Scene, PullToRefresh } from '@comps'
import {
  add,
  add_active,
  add_disabled,
  arrowDown,
  arrowRight,
  backBlack,
  backWhite,
  arrowUp,
  coupon_card_content,
  banner,
  bottomBg,
  couponRed,
  fire,
  more,
  coupon_card_grey
} from '@img'
import styles from './index.module.less'
import './index.less'

const imgList = () => {
  const history = useIonRouter()
  const [state] = useSetState<{
    dataList: Array<string>
    isLoading: boolean
    hasMore: boolean
    refreshing: boolean
  }>({
    dataList: [
      'http://oss.suning.com/sffe/sffe/goods.png',
      add,
      add_active,
      add_disabled,
      arrowDown,
      arrowRight,
      backBlack,
      backWhite,
      arrowUp,
      coupon_card_content,
      banner,
      bottomBg,
      couponRed,
      fire,
      more,
      coupon_card_grey
    ],
    isLoading: false,
    hasMore: true,
    refreshing: true
  })

  return (
    <Scene title="图片列表" onLeftClick={() => history.goBack()}>
      <PullToRefresh
        onRefresh={freshEnd => {
          setTimeout(() => freshEnd(), 2000)
        }}
      >
        <Virtuoso
          style={{ height: '100%', width: '100%' }}
          data={state.dataList}
          endReached={() => {}}
          itemContent={(index, item) => (
            <div key={index} className={styles.item_container} onClick={() => history.push('/imgDetail')}>
              <img alt={''} className={styles.goods_img} src={item} />
            </div>
          )}
          components={{ Footer }}
        />
      </PullToRefresh>
    </Scene>
  )
}

export default imgList

const Footer = () => {
  return (
    <div
      style={{
        padding: '0.6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      Loading...
    </div>
  )
}
