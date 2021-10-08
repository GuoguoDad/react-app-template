import React from 'react'
import { InfiniteScroll, List, Button, Space } from 'antd-mobile'
import { useSetState } from 'ahooks'
import { add, add_active, add_disabled, arrowDown, arrowRight, backBlack, backWhite, arrowUp, coupon_card_content, banner, bottomBg, couponRed, fire, more, coupon_card_grey } from '@img/index'
import { Header } from '@comps'
import styles from './index.module.less'
import './index.less'

import Item from './components/item'

const ImageList = () => {
  const [state, setState] = useSetState<{ dataList: Array<string>, isLoading: boolean, hasMore: boolean, refreshing: boolean }>
                      ({
                        dataList: ['http://oss.suning.com/sffe/sffe/goods.png',
                          add,add_active,add_disabled,arrowDown,arrowRight,backBlack,backWhite,arrowUp,coupon_card_content,
                          banner, bottomBg,couponRed,fire,more,coupon_card_grey], isLoading: false, hasMore: true, refreshing: true })

  const renderLoading = () => {
    return <div className={styles.loading}>{state.isLoading ? '加载中...' : state.hasMore ? '加载结束' : '没有更多了~'}</div>
  }

  return (
    <>
      <Header
        hasBack
        showRight
        title="图片懒加载"
      />
      <Space wrap>
        <Button
          onClick={() => {
            alert('hello.')
          }}
        >
          Default
        </Button>
        <Button color='primary'>Primary</Button>
        <Button color='success'>Success</Button>
        <Button color='danger'>Danger</Button>
        <Button color='warning'>Warning</Button>
      </Space>
      <div style={{ height: 'calc(100% - 0.88rem)' }}>
        <List>
          {state.dataList.map((item, index) => (
            <Item key={index} url={item}/>
          ))}
        </List>
        <InfiniteScroll loadMore={async () => {}} hasMore={state.hasMore} />
      </div>
    </>
  )
}

export default ImageList
