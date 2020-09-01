import React, { useState, RefObject, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView, PullToRefresh } from 'antd-mobile';

import { Header, SearchScanBar, Loading, ListContainer } from '../../components';
import { queryStoreGoodsListAsync } from './actor';
import { pullRefresh, setCurrentPage } from './store';
import { RootState } from '../../store';
import { GoodsListItem } from './component/item';
import { Goods } from './types';

const MyPullToRefresh: any = PullToRefresh;

const goodsList = () => {
  const { 
    currentPage, 
    isLoading, 
    dataList, 
    refreshing,
    hasMore,
  } = useSelector((state: RootState) => state.goods)

  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState('')
  const [height, setHeight] = useState(0)
  const preDomRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const ds = new ListView.DataSource({ rowHasChanged: (r1: Goods, r2: Goods) => r1 !== r2 });

  const queryList = (pageNum: number) => {
    const params = {
      storeCode: '',
      keyWord,
      pageNum,
      pageSize: 20
    }
    dispatch(queryStoreGoodsListAsync(params))
  }

  useEffect(() => {
    queryList(currentPage)
  }, [])

  useEffect(() => {
    const offsetTop = preDomRef.current?.offsetTop ?? 0
    const height = document.documentElement.clientHeight - offsetTop;
    setHeight(height)
  })

  const loadMore = () => {
    if (hasMore) {
      const newPage = currentPage + 1
      dispatch(setCurrentPage(newPage))
      queryList(newPage)
    }
  }

  const refresh = () => {
    dispatch(pullRefresh())
    queryList(1)
  }

  return (
    <>
      <Header
        hasBack={true}
        showRight={false}
        title = '选择商品'
        backFun={()=>{console.log('-----back')}}
      />
      <SearchScanBar 
        placeholder = "搜索商品名称/条形码"
        onChange={(val: string) => {
          setKeyWord(val)
          refresh()
        }}
        onScanClick={()=>{
          console.log('-----scan')
        }}
      />
      <div ref={preDomRef} />
      <ListView
        initialListSize = {20}
        dataSource={ds.cloneWithRows(dataList)}
        style={{ height: height }}
        renderRow={GoodsListItem}
        renderFooter={() => 
          <Loading isLoading={isLoading} hasMore={hasMore}/>
        }
        className="list-view-container"
        pullToRefresh={
          <MyPullToRefresh
            refreshing={refreshing}
            onRefresh={() => refresh()}
          />
        }
        onEndReached={()=> loadMore()}
        renderBodyComponent={() => <ListContainer />}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    </>
  )
} 

export default goodsList;