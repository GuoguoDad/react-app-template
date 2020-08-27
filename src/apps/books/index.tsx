import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { queryBooksByPageAsync } from './booksSlice';
import { RootState } from '../../store';
import styles from './books.module.less';

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

  console.log("entities", books.entities)

  return (
    <div className={styles.row}>
      {JSON.stringify(books.entities)}
    </div>
  )
}

export default BooksManageList;