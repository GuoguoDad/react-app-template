import { createSlice, createEntityAdapter, PayloadAction, Update, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../store';
import { queryBooksByPage, PageParam, Book } from './webapi';

export const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.bookId,
  sortComparer: (book1, book2) => book1.bookName.localeCompare(book2.bookName),
});

export const queryBooksByPageAsync = createAsyncThunk<Book[], PageParam, { state: RootState }>(
  'add/books',
  async (params, { getState, requestId }) => {
    const { data } = await queryBooksByPage(params);
    return data;
  },
);

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    isLoading: false,
  }),
  reducers: {
    bookAdd: {
      reducer(state, action: PayloadAction<Book>) {
        booksAdapter.addOne(state, action.payload);
      },
      prepare(text: Book) {
        text.bookId = uuidv4();
        return {
          payload: text,
        };
      },
    },
    bookEdit: (state, action: PayloadAction<Update<Book>>) => {
      booksAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryBooksByPageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(queryBooksByPageAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      booksAdapter.addMany(state, payload);
    }),
      builder.addCase(queryBooksByPageAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { bookAdd, bookEdit } = booksSlice.actions;

export default booksSlice.reducer;
