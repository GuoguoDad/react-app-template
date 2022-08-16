<center><h1>移动端h5项目，模拟移动端栈路由<h1></center>

## 效果
<img src="https://img-blog.csdnimg.cn/9879c9bf85db432e974481c93da02b77.gif#pic_center"  alt="效果" width="300"/><br/>

## 为什么不用react-router
移动端打开页面其实是栈的入栈操作，关闭页面是栈的出栈操作，而传统的h5路由，如react-router是不具备栈这个特性的，满足不了移动端的需求

## 栈路由
栈路由什么意思尼，其实app就是一个栈，栈遵循先进后出的原则，打开页面即入栈操作，关闭页面即出栈操作。

<img src="https://img-blog.csdnimg.cn/2ed9e45c200e47e9a460a51cacddc014.png#pic_center"  alt="效果" width="400"/>

- 打开A页面的时候，就是A入栈，A页面在栈顶，app就显示A页面
- 又打开了B页面，B又入栈，B页面在栈顶，A页面在栈中并没有销毁，app显示B页面
- 再打开C页面，C又入栈， C页面在栈顶，AB页面在栈中并没有销毁， app显示C页面

<br/>

<img src="https://img-blog.csdnimg.cn/da263e35aad14468925438cfe865dfba.png#pic_center"  alt="效果" width="400"/>

- C页面关闭(出栈), B页面成为栈顶， app显示B页面
- B页面关闭(出栈), A页面成为栈顶，app显示A页面

## 实现
这里用的第三方的 @ionic/react-router 路由
```
import React, { useEffect } from 'react'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const MainTabs = loadable(() => import('@pages/main' /* webpackChunkName: 'MainTabs', webpackPrefetch: true */))
const ImgList = loadable(() => import('@pages/imgList' /* webpackChunkName: 'ImgList', webpackPrefetch: true */))
const ImgDetail = loadable(() => import('@pages/imgDetail' /* webpackChunkName: 'ImgDetail', webpackPrefetch: true */))

const App = () => {
  useEffect(() => {
    setupIonicReact({
      mode: 'ios'
    })
  }, [])

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact={true} path="/" render={() => <Redirect to="/main" />} />
          <Route path={'/main'} exact component={MainTabs} />
          <Route path={'/imgList'} exact component={ImgList} />
          <Route path={'/imgDetail'} exact component={ImgDetail} />
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App

```
## 分析如何实现
<img src="https://img-blog.csdnimg.cn/abaec81e64ec42c8b5b8c3fbb2bd093b.png#pic_center"  alt="效果" width="700"/><br/>
<img src="https://img-blog.csdnimg.cn/3d4a9923884b4067bc6623f27c071102.png#pic_center"  alt="效果" width="700"/><br/>
<img src="https://img-blog.csdnimg.cn/5016cadaeeca4e56ab8ff0570fc5c930.png#pic_center"  alt="效果" width="700"/><br/>

- 打开第一个页面（入栈）document 增加一个class为ion-page的div，
- 打开第二个页面document 增加一个class为ion-page-can-go-back的div，同时把第一个div的class增加 ion-page-hidden
- 打开第三个页面document 增加一个class为ion-page-can-go-back的div, 同时把第二个页面的class增加 ion-page-hidden
- 总结： 通过隐藏与显示来模拟栈路由的操作，思想简单，易于实现

源码地址：
http://github.com/GuoguoDad/react-app-template


## 交个朋友
* 如果对你有帮助，来个三连，谢谢







