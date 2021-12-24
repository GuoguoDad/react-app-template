import React, { useEffect } from 'react'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const MainTabs = loadable(() => import('@pages/main'/* webpackChunkName: 'MainTabs', webpackPrefetch: true */))
const ImgList = loadable(() => import('@pages/imgList'/* webpackChunkName: 'ImgList', webpackPrefetch: true */))
const ImgDetail = loadable(() => import('@pages/imgDetail'/* webpackChunkName: 'ImgDetail', webpackPrefetch: true */))

const App = () => {
  useEffect(() => {
    setupIonicReact({
      mode: 'ios'
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
