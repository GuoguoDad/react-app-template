import React, { useEffect, useRef, useState, ReactNode, MutableRefObject, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView } from 'antd-mobile';
import './index.less';

import { Header } from '../../components';
import { queryUnpackListAsync } from './actor';
import { RootState } from '../../store';
import { unpackGoods } from './types';
import Item from './component/item';

const ListContainer = (props: { children?: ReactNode }) => {
  return (
    <div className="am-list-body my-body">
      {props.children}
    </div>
  );
}

const unpackList = () => {
  const { currentPage, isLoading, dataList, hasMore } = useSelector((state: RootState) => state.unpacks)
  const dispatch = useDispatch();

  const [height, setHeight] = useState(0)
  const preDomRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const queryList = () => {
    const params= {
      pageNo: currentPage,
      pageSize: 20
    }
    dispatch(queryUnpackListAsync(params))
  }

  useEffect(() => {
    queryList()
  }, [])

  useEffect(() => {
    const offsetTop = preDomRef.current?.offsetTop ?? 0
    const height = document.documentElement.clientHeight - offsetTop;
    setHeight(height)
  })

  /**
   * 渲染数据项
   * @param rowData 
   * @param sectionID 
   * @param rowID 
   */
  const row = (rowData: unpackGoods, sectionID: string | number, rowID: string | number) => {
    return (
      <Item data={rowData} sectionID={sectionID} rowID={rowID}/>
    );
  };

  const renderFooter = () => {
    return (
      <div style={{ padding: 15, textAlign: 'center' }}>
        {isLoading ? '加载中...' : hasMore ? '加载结束' : '没有更多了~'}
      </div>
    )
  }

  const loadMore = () => {
    if (hasMore) {
      queryList()
    }
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
      <div ref={preDomRef} />
      <ListView 
        initialListSize = {20}
        dataSource={ds.cloneWithRows(dataList)}
        style={{ height: height }}
        renderRow={row}
        renderFooter={() => renderFooter()}
        className="list-view-container"
        onEndReached={()=> loadMore()}
        renderBodyComponent={() => <ListContainer />}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    </>
  )
}
export default unpackList;