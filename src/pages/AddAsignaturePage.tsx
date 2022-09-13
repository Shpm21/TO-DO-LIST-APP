import React from 'react'
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useParams } from 'react-router'
import AddAsignatureItem from '../components/AddAsignatureItem'

const AddAsignaturePage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddAsignatureItem />
      </IonContent>
    </IonPage>
  )
}

export default AddAsignaturePage
