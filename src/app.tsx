import React from 'react'
import { Switch ,Route } from 'react-router-dom'
import { Loadable } from '@kits'

const Test = Loadable(()=> import('@pages/test'))
const ImageList = Loadable(()=> import('@pages/imageList'))
const ImageDetail = Loadable(()=> import('@pages/imageDetail'))

const App = () => {
  return (
    <Switch>
      <Route exact path="/test" component={Test} />
      <Route exact path="/imageList" component={ImageList} />
      <Route exact path="/imageDetail" component={ImageDetail} />
    </Switch>
  )
}

export default App
