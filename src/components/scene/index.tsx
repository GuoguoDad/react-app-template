import React, { PropsWithChildren } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import NarBar from '../nav-bar'

const Index = (props: IndexProps) => {
  const { title = '', onLeftClick = () => {}, showNar = true, children } = props

  return (
    <IonPage>
      {showNar ? <NarBar title={title} onLeftClick={onLeftClick} /> : null}
      <IonContent scrollY={false}>{children}</IonContent>
    </IonPage>
  )
}

export default Index

type IndexProps = PropsWithChildren<{
  showNar?: boolean
  title?: string
  onLeftClick?: Function
}>
