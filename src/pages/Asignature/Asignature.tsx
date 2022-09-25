import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useParams } from 'react-router'
import './Asignature.css'
import ViewTaskFromAsignature from './components/ViewTaskFromAsignature/ViewTaskFromAsignature'

const Asignature: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/asignatures" icon="chevron-back" />
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
        <ViewTaskFromAsignature name={name} />
      </IonContent>
    </IonPage>
  )
}

export default Asignature