import React from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'
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

  const ds = new ListView.DataSource({ rowHasChanged: (r1: string, r2: string) => r1 !== r2 })

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
      <ListView
        initialListSize={20}
        dataSource={ds.cloneWithRows(state.dataList)}
        style={{ height: 'calc(100% - 0.88rem)' }}
        renderRow={(rowData: string, sectionID: string | number, rowID: string | number) =>{
          return (
            <Item url={rowData}/>
          )
        }}
        renderFooter={() => renderLoading()}
        // @ts-ignore
        pullToRefresh={<PullToRefresh refreshing={state.refreshing} onRefresh={() => {}} />}
        onEndReached={() => {}}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    </>
  )
}

export default ImageList