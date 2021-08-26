import React from 'react'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import { Loadable } from '@kits'

const history = createHashHistory()

const Counter = Loadable(() => import('./pages-demo/counter/counter'))
const BooksManageList = Loadable(() => import('./pages-demo/books/index'))
const UnpackList = Loadable(() => import('./pages/unpackList'))
const GoodsList = Loadable(() => import('./pages/goodsList'))

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/counter" component={Counter} />
        <Route path="/BooksManageList" component={BooksManageList} />
        <Route path="/unpackList/:storeCode" component={UnpackList} />
        <Route path="/goodsList/:storeCode" component={GoodsList} />
      </Switch>
    </Router>
  )
}

export default Routes