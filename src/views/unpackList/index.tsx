import React, { useEffect, useRef, useState, ReactNode } from 'react';
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
  const { currentPage, isLoading, dataList } = useSelector((state: RootState) => state.unpacks)
  const dispatch = useDispatch();

  const [height, setHeight] = useState(0)
  const lvRef = useRef(null)

  useEffect(()=>{
    const params= {
      pageNo: currentPage,
      pageSize: 20
    }
    dispatch(queryUnpackListAsync(params))
  },[])

  useEffect(()=>{
    console.log("==lvRef:", lvRef.current)
    // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(lvRef)?.parentNode?.offsetTop;
    // console.log("---------------------:",hei)
  })

  const row = (rowData: unpackGoods, sectionID: string | number, rowID: string | number) => {
    return (
      <Item data={rowData} sectionID={sectionID} rowID={rowID}/>
    );
  };

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
      <ListView
        dataSource={ds.cloneWithRows(dataList)}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        style={{
          height: document.documentElement.clientHeight - 100,
          overflow: 'auto',
          marginTop: '0.1rem'
        }}
        renderBodyComponent={() => <ListContainer />}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
    </>
  )
}
export default unpackList;