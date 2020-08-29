import { Router } from './kits';
//demo begin
import Counter from './views-demo/counter/counter';
import BooksManageList from './views-demo/books/index';
//page begin
import UnpackList from './views/unpackList';

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