import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ViewAllAsignatures from '../components/ViewAllAsignatures'
import './Home.css'

const AsignaturesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Asignaturas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Asignaturas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ViewAllAsignatures />
      </IonContent>
    </IonPage>
  )
}

export default AsignaturesPage
