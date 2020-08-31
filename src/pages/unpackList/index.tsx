import React, { useEffect, useRef, useState, ReactNode, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView, PullToRefresh, SearchBar } from 'antd-mobile';
import './index.less';

import { Header } from '../../components';
import { queryUnpackListAsync } from './actor';
import { RootState } from '../../store';
import { pullRefresh, setCurrentPage } from './store';
import { unpackGoods } from './types';
import Item from './component/item';

const MyPullToRefresh: any = PullToRefresh;

const ListContainer = (props: { children?: ReactNode }) => {
  return (
    <div className="am-list-body my-body">
      {props.children}
    </div>
  );
}

const unpackList = () => {
  const { 
    currentPage, 
    isLoading, 
    dataList, 
    refreshing,
    hasMore 
  } = useSelector((state: RootState) => state.unpacks)
  const dispatch = useDispatch();

  const [height, setHeight] = useState(0)
  const preDomRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const queryList = (pageNo: number) => {
    const params = {
      pageNo,
      pageSize: 20
    }
    dispatch(queryUnpackListAsync(params))
  }

  useEffect(() => {
    queryList(currentPage)
  }, [])

  useEffect(() => {
    const offsetTop = preDomRef.current?.offsetTop ?? 0
    const height = document.documentElement.clientHeight - offsetTop;
    setHeight(height)
  })

  const row = (rowData: unpackGoods, sectionID: string | number, rowID: string | number) => {
    return (
      <Item data={rowData} sectionID={sectionID} rowID={rowID}/>
    );
  };

  const renderLoading = () => {
    return (
      <div className="unpack_loading">
        {isLoading ? '加载中...' : hasMore ? '加载结束' : '没有更多了~'}
      </div>
    )
  }

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

  const ds = new ListView.DataSource({ rowHasChanged: (r1: unpackGoods, r2: unpackGoods) => r1 !== r2 });

  return (
    <>
      <Header
        hasBack={true}
        showRight={true}
        title = '拆包'
        rightTxt= '新增配比'
        backFun={()=>{console.log('-----back')}}
        rightFun={()=>{console.log('-----add')}}
      />
      <SearchBar placeholder="Search" maxLength={8} />
      <div ref={preDomRef} />
      <ListView
        initialListSize = {20}
        dataSource={ds.cloneWithRows(dataList)}
        style={{ height: height }}
        renderRow={row}
        renderFooter={() => renderLoading()}
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
export default unpackList;