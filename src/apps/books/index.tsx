import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EntityState } from '@reduxjs/toolkit';
import { ListView } from 'antd-mobile';

import { queryBooksByPageAsync } from './booksSlice';
import { RootState } from '../../store';
import { Book } from './webapi';
import styles from './books.module.less';


const BooksManageList = () => {
  const books = useSelector((state: RootState) => state.books)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      style={{}}
    />
  );

  const row = (rowData: Book, sectionID: string | number, rowID: string | number) => {
    const { bookName, author, price } = rowData;
    return (
      <div key={rowID} style={{ padding: '0 15px' }}>
        <div 
          style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
        >{ bookName }</div>
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{ author }</div>
            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{ price }</span>¥</div>
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
        {isLoading ? 'Loading...' : 'Loaded'}
      </div>)}
      renderRow={row}
      renderSeparator={separator}
      className="am-list"
      pageSize={4}
      useBodyScroll
      onScroll={() => { console.log('scroll'); }}
      scrollRenderAheadDistance={500}
      onEndReachedThreshold={10}
    />
  )
}

export default BooksManageList;