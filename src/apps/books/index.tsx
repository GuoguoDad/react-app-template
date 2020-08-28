import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView } from 'antd-mobile';

import { queryBooksByPageAsync } from './booksSlice';
import { RootState } from '../../store';
import styles from './books.module.less';
import { Book } from './webapi';
import { EntityState, Dictionary } from '@reduxjs/toolkit';

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

  let index = books.ids.length - 1;
  const separator = (sectionID: string | number, rowID: string | number) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
    />
  );

  const row = (rowData: Book[], sectionID: string | number, rowID: string | number) => {
    return (
      <div key={rowID} style={{ padding: '0 15px' }}>
        <div
          style={{
            lineHeight: '50px',
            color: '#888',
            fontSize: 18,
            borderBottom: '1px solid #F6F6F6',
          }}
        >西游记</div>
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>吴承恩</div>
            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>58.9</span>¥</div>
          </div>
        </div>
      </div>
    );
  };

  const convertData = (dataObj: EntityState<Book>) => {
    debugger
    if(!dataObj.ids.length) {
      return []
    }
    const books = dataObj.ids.map(v=>{
      return dataObj.entities[v]
    })

    // const dataSource = new ListView.DataSource({
    //   getRowData: = (dataBlob, sectionID, rowID) => dataBlob[rowID],
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    //   sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    // });
  }

  return (
    <ListView
      dataSource={()=>{ 
        const data = convertData(books)
        console.log('==data:', data)
        return data
      }}
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