import { Router } from './kits';
import Counter from './views-demo/counter/counter';
import BooksManageList from './views-demo/books/index';

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