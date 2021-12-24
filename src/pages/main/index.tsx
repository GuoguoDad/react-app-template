import React from 'react'
import { Scene } from '@comps'
import { useIonRouter } from '@ionic/react'
import { TabBar, Button } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { AppDispatch, RootState } from '@store'
import { setState } from './slice'

import styles from './index.module.less'


const tabs = [
  {
    key: 'home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: 'todo',
    title: '我的待办',
    icon: <UnorderedListOutline />,
  },
  {
    key: 'message',
    title: '我的消息',
    icon: <MessageOutline />,
  },
  {
    key: 'user',
    title: '个人中心',
    icon: <UserOutline />,
  },
]

const main = () => {
  const history = useIonRouter()
  const dispatch: AppDispatch = useDispatch()
  const { currentTab } = useSelector((state: RootState) => state.main)

  return (
    <Scene showNar={false}>
      <div className={styles.pageContainer}>
        <div className={styles.body}>
          <Button color='primary' onClick={()=> history.push('/imgList')}>Test</Button>
        </div>
        <div className={styles.bottom}>
          <TabBar activeKey={currentTab} onChange={value => {
            dispatch(setState({ currentTab: value }))
          }}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      </div>
    </Scene>
  )
}

export default main
