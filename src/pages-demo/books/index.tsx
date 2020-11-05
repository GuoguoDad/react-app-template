import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EntityState } from '@reduxjs/toolkit';
import { ListView } from 'antd-mobile';

import GoodsImg from '@assets/images/goods_img.png';
import { queryBooksByPageAsync } from './booksSlice';
import { RootState } from '../../store';
import { Book } from './webapi';
import styles from './books.module.less';

import { Header } from '../../components';

const BooksManageList = () => {
  const books = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();

  const queryPageList = (pageNun: number) => {
    const params = {
      pageNo: pageNun,
      pageSize: 10,
    };
    dispatch(queryBooksByPageAsync(params));
  };

  useEffect(() => {
    queryPageList(1);
  }, []);

  const row = (rowData: Book, sectionID: string | number, rowID: string | number) => {
    const { bookName, author, price } = rowData;
    return (
      <div key={rowID} className={styles.item}>
        <div className={styles.bookName}>{bookName}</div>
        <div className={styles.author}>
          <img style={{ height: '64px', marginRight: '15px' }} src={GoodsImg} />
          <div className={styles.bottomView}>
            <div className={styles.bottomView}>
              <div className={styles.authorTxt}>{author}</div>
              <div>
                <span className={styles.price}>{price}</span>¥
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ds = new ListView.DataSource({ rowHasChanged: (r1: Book, r2: Book) => r1 !== r2 });

  const convertData = (dataObj: EntityState<Book>) => {
    if (!dataObj.ids.length) {
      return ds.cloneWithRows([]);
    }
    const books = dataObj.ids.map((v) => {
      return dataObj.entities[v];
    });
    return ds.cloneWithRows(books);
  };

  const dataSource = convertData(books);

  return (
    <>
      <Header hasBack={false} showRight={false} title="DEMO" />
      <div className={styles.listContainer}>
        <ListView
          dataSource={dataSource}
          initialListSize={10}
          style={{ height: '100%' }}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>{books.isLoading ? 'Loading...' : 'Loaded'}</div>
          )}
          renderRow={row}
          onEndReached={() => queryPageList(1)}
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={10}
        />
      </div>
    </>
  );
};

export default BooksManageList;
