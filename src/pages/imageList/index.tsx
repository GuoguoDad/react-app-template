import React, {useEffect} from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
import { useSetState } from 'ahooks'
import { add, add_active, add_disabled, arrowDown, arrowRight, backBlack, backWhite, arrowUp, coupon_card_content, banner, bottomBg, couponRed, fire, more, coupon_card_grey } from '@img/index'
import { Header } from '@comps'
import styles from './index.module.less'
import './index.less'

import Item from './components/item'
import { useHistory } from 'react-router'

const ImageList = (props: any) => {
  const history = useHistory()
  const [state, setState] = useSetState<{ dataList: Array<string>, isLoading: boolean, hasMore: boolean, refreshing: boolean }>
                      ({
                        dataList: ['http://oss.suning.com/sffe/sffe/goods.png',
                          add,add_active,add_disabled,arrowDown,arrowRight,backBlack,backWhite,arrowUp,coupon_card_content,
                          banner, bottomBg,couponRed,fire,more,coupon_card_grey], isLoading: false, hasMore: true, refreshing: true })

  useEffect(()=>{
    console.log('===========')
  },[])

  return (
    <div className={styles.page}>
      <Header
        hasBack
        showRight
        title="图片懒加载"
      />
      <div className={styles.infiniteList}>
        <List>
          {state.dataList.map((item, index) => (
            <Item key={index} url={item} onClickFun={()=>
              history.push('/imageDetail')
            }/>
          ))}
        </List>
        <InfiniteScroll loadMore={async () => {}} hasMore={state.hasMore} />
      </div>
    </div>
  )
}

export default ImageList
