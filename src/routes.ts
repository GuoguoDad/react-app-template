import { Router } from './kits';
//demo begin
import Counter from './pages-demo/counter/counter';
import BooksManageList from './pages-demo/books/index';
//page begin
import UnpackList from './pages/unpackList';

const routes = [
  {
    path: '/counter',
    component: Counter
  },
  {
    path: '/booksManageList',
    component: BooksManageList
  },
  {
    path: '/unpackList',
    component: UnpackList
  }
]

export default Router.renderRoutes(routes);