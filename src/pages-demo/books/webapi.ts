import { Fetch } from '../../kits'

export const queryBooksByPage = (params: PageParam) => {
  return Fetch.post<Book[]>('http://localhost:8090/api/books/queryBooksByPage', params)
}

export type Book = {
  bookId: string;
  bookName: string;
  author: string;
  price: number;
};

export interface PageParam {
  pageNo: number;
  pageSize: number;
}
