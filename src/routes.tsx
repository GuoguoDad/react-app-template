import React from 'react'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import { Loadable } from '@kits'

const history = createHashHistory()

const UnpackList = Loadable(() => import('@pages/unpackList'))
const GoodsList = Loadable(() => import('@pages/goodsList'))
const ImageList = Loadable(() => import('@pages/imageList'))

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/imageList" component={ImageList} />
        <Route path="/unpackList/:storeCode" component={UnpackList} />
        <Route path="/goodsList/:storeCode" component={GoodsList} />
      </Switch>
    </Router>
  )
}

export default Routes