import { Router } from './kits';
import Counter from './apps/counter/counter';
import BooksManageList from './apps/books';

const routes = [
  {
    path: '/counter',
    component: Counter
  },
  {
    path: '/booksManageList',
    component: BooksManageList
  }
]

export default Router.renderRoutes(routes);