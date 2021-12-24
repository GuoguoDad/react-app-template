import React, { useEffect } from 'react'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import loadable from '@loadable/component'
import { Route } from 'react-router-dom'

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
          <Route path={'/main'} exact component={MainTabs}/>
          <Route path={'/imgList'} exact component={ImgList}/>
          <Route path={'/imgDetail'} exact component={ImgDetail}/>
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
