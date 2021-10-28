import React from 'react'
import { Router } from 'react-router'
import { Switch ,Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import { Loadable } from '@kits'

const history = createHashHistory()

// import ImageList from '@pages/imageList'
// import ImageDetail from '@pages/imageDetail'
const ImageList = Loadable(()=> import('@pages/imageList'))
const ImageDetail = Loadable(()=> import('@pages/imageDetail'))

const App = () => {
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/imageList" component={ImageList} />
          <Route exact path="/imageDetail" component={ImageDetail} />
        </Switch>
    </Router>
  )
}

export default App
