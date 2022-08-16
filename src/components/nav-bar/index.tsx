import React from 'react'
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react'

const Index = (props: IndexProps) => {
  const { title, onLeftClick = () => {} } = props

  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start" onClick={() => onLeftClick()}>
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Index

type IndexProps = {
  title: string
  onLeftClick?: Function
}
