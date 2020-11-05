import React, { useEffect, useRef, useState, ReactNode, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView, PullToRefresh, Modal } from 'antd-mobile';
import './index.less';

import { pullRefresh, setCurrentPage, setShowUnpackingModal } from './store';
import { Header, SearchScanBar } from '../../components';
import { queryUnpackListAsync } from './actor';
import { RootState } from '../../store';
import { UnpackGoods } from './types';
import Item from './component/item';
import UnpackingModal from './component/unpacking-popup-modal';
import ResultModal from './component/unpacking-result-modal';
import { RouteComponentProps } from 'react-router-dom';

const { alert } = Modal;
const MyPullToRefresh: any = PullToRefresh;

const ListContainer = (props: { children?: ReactNode }) => {
  return <div className="am-list-body my-body">{props.children}</div>;
};

const unpackList = (props: RouteComponentProps<{ storeCode: string }>) => {
  const { currentPage, isLoading, dataList, refreshing, hasMore } = useSelector((state: RootState) => state.unpacks);

  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState('');
  const [height, setHeight] = useState(0);
  const preDomRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const queryList = (pageNum: number) => {
    const params = {
      storeCode: props.match?.params.storeCode,
      keyWord,
      pageNum,
      pageSize: 20,
    };
    dispatch(queryUnpackListAsync(params));
  };

  useEffect(() => {
    queryList(currentPage);
  }, []);

  useEffect(() => {
    const offsetTop = preDomRef.current?.offsetTop ?? 0;
    const height = document.documentElement.clientHeight - offsetTop;
    setHeight(height);
  });

  const toDel = () => {
    alert('删除配比关系', '请确认是否删除配比关系？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {},
      },
    ]);
  };

  const row = (rowData: UnpackGoods, sectionID: string | number, rowID: string | number) => {
    return (
      <Item
        data={rowData}
        sectionID={sectionID}
        rowID={rowID}
        toDel={() => toDel()}
        toUnpackPackage={() => dispatch(setShowUnpackingModal({ show: true, data: rowData }))}
      />
    );
  };

  const renderLoading = () => {
    return <div className="unpack_loading">{isLoading ? '加载中...' : hasMore ? '加载结束' : '没有更多了~'}</div>;
  };

  const loadMore = () => {
    if (hasMore) {
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage));
      queryList(newPage);
    }
  };

  const refresh = () => {
    dispatch(pullRefresh());
    queryList(1);
  };

  const ds = new ListView.DataSource({ rowHasChanged: (r1: UnpackGoods, r2: UnpackGoods) => r1 !== r2 });

  return (
    <>
      <Header
        hasBack
        showRight
        title="拆包"
        rightTxt="新增配比"
        backFun={() => {
          console.log('-----back');
        }}
        rightFun={() => {
          console.log('-----add');
        }}
      />
      <SearchScanBar
        placeholder="搜索商品名称/条形码"
        onChange={(val: string) => {
          setKeyWord(val);
          refresh();
        }}
        onScanClick={() => {
          console.log('-----scan');
        }}
      />
      <div ref={preDomRef} />
      <ListView
        initialListSize={20}
        dataSource={ds.cloneWithRows(dataList)}
        style={{ height }}
        renderRow={row}
        renderFooter={() => renderLoading()}
        className="list-view-container"
        pullToRefresh={<MyPullToRefresh refreshing={refreshing} onRefresh={() => refresh()} />}
        onEndReached={() => loadMore()}
        renderBodyComponent={() => <ListContainer />}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
      />
      <UnpackingModal />
      <ResultModal />
    </>
  );
};
export default unpackList;
