import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EntityState } from '@reduxjs/toolkit';
import { ListView } from 'antd-mobile';

import { queryBooksByPageAsync } from './booksSlice';
import { RootState } from '../../store';
import { Book } from './webapi';
import styles from './books.module.less';

import GoodsImg from '@assets/images/goods_img.png';

const BooksManageList = () => {
  const books = useSelector((state: RootState) => state.books)
  const dispatch = useDispatch();

  useEffect(()=>{
    const params= {
      pageNo: 1,
      pageSize: 10
    }
    dispatch(queryBooksByPageAsync(params))
  },[])


  const separator = (sectionID: string | number, rowID: string | number) => (
    <div
      key={`${sectionID}-${rowID}`}
      className={styles.separatorLine}
    />
  );

  const row = (rowData: Book, sectionID: string | number, rowID: string | number) => {
    const { bookName, author, price } = rowData;
    return (
      <div key={rowID} className={styles.item} >
        <div className={styles.bookName}>{ bookName }</div>
        <div className={styles.author}>
          <img style={{ height: '64px', marginRight: '15px' }} src={GoodsImg} />
          <div className={styles.bottomView}>
            <div className={styles.authorTxt}>{ author }</div>
            <div><span className={styles.price}>{ price }</span>¥</div>
          </div>
        </div>
      </div>
    );
  };

  const ds = new ListView.DataSource({ rowHasChanged: (r1: Book, r2: Book) => r1 !== r2 });

  const convertData = (dataObj: EntityState<Book>) => {
    if(!dataObj.ids.length) {
      return ds.cloneWithRows([])
    }
    const books = dataObj.ids.map(v=>{
      return dataObj.entities[v]
    })
    return ds.cloneWithRows(books)
  }

  const dataSource = convertData(books)

  return (
    <ListView
      dataSource={dataSource}
      renderHeader={() => <span>header</span>}
      renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
        {books.isLoading ? 'Loading...' : 'Loaded'}
      </div>)}
      renderRow={row}
      renderSeparator={separator}
      className="am-list"
      useBodyScroll
      onScroll={() => { console.log('scroll'); }}
      scrollRenderAheadDistance={500}
      onEndReachedThreshold={10}
    />
  )
}

export default BooksManageList;