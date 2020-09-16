import { Router, Loadable } from './kits';
//demo begin
const Counter = Loadable(() => import('./pages-demo/counter/counter'));
const BooksManageList = Loadable(() => import('./pages-demo/books/index'));

//page begin
const UnpackList = Loadable(() => import('./pages/unpackList'));
const GoodsList = Loadable(() => import('./pages/goodsList'));

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
    path: '/unpackList/:storeCode',
    component: UnpackList
  },
  {
    path: '/goodsList/:storeCode',
    component: GoodsList
  }
]

export default Router.renderRoutes(routes);