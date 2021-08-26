import React, { ReactNode } from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'
import { useSetState } from 'ahooks'
import { Header } from '@comps'
import styles from './index.module.less'
import './index.less'

import Item from './components/item'

const ListContainer = (props: { children?: ReactNode }) => {
  return <div className="am-list-body my-body">{props.children}</div>
}

const ImageList = () => {
  const [state, setState] = useSetState<{ dataList: Array<string>, isLoading: boolean, hasMore: boolean, refreshing: boolean }>
                      ({ dataList: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''], isLoading: false, hasMore: true, refreshing: true })

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
        className="list-view-container"
        // @ts-ignore
        pullToRefresh={<PullToRefresh refreshing={state.refreshing} onRefresh={() => {}} />}
        onEndReached={() => {}}
        renderBodyComponent={() => <ListContainer />}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    </>
  )
}

export default ImageList