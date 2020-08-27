import { 
  createSlice, 
  createEntityAdapter, 
  PayloadAction, 
  Update,
  createAsyncThunk 
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../store';

type Book = {
  bookId: string;
  bookName: string;
  author: string;
  price: number
}

type queryBooksParam = {
  pageNo: number,
  pageSize: number
}

export const booksAdapter = createEntityAdapter<Book>({
  selectId: book => book.bookId,
  sortComparer: (book1, book2) => book1.bookName.localeCompare(book2.bookName) 
}) 

export const queryBooksByPageAsync = createAsyncThunk<Book[], Partial<queryBooksParam>, { state: RootState }>(
  'add/books',
  async (param, { getState, requestId }) => {
    const { pageNo, pageSize } = param;
    const books: Book[] = [];

    return books;
  }
) 

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    bookAdd: {
      reducer(state, action: PayloadAction<Book>){
        booksAdapter.addOne(state, action.payload)
      },
      prepare(text: Book) {
        text.bookId = uuidv4()
        return {
          payload: text
        }
      }
    },
    bookEdit: (state, action: PayloadAction<Update<Book>>) => {
      booksAdapter.updateOne(state, action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(queryBooksByPageAsync.fulfilled, (state, { payload })=> {
      booksAdapter.addMany(state, payload)
    })
  }
})

export const { bookAdd, bookEdit } = booksSlice.actions

export default booksSlice.reducer;