import React, { useEffect } from 'react'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const MainTabs = loadable(() => import('@pages/main'))
const ImgList = loadable(() => import('@pages/imgList'))
const ImgDetail = loadable(() => import('@pages/imgDetail'))

const App = () => {
  useEffect(() => {
    setupIonicReact({
      mode: 'md'
    })
  },[])

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact={true} path="/" render={() => (
            <Redirect to="/main" />
          )} />
          <Route path={'/main'} exact component={MainTabs}/>
          <Route path={'/imgList'} exact component={ImgList}/>
          <Route path={'/imgDetail'} exact component={ImgDetail}/>
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
