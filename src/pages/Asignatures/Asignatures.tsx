import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ShowAllAsignatures from './components/ShowAllAsignatures/ShowAllAsignatures'
import './Asignatures.css'

const Asignatures: React.FC = () => {
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
        <ShowAllAsignatures />
      </IonContent>
    </IonPage>
  )
}

export default Asignatures
