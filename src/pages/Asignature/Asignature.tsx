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
import { useState } from 'react'
import { useParams } from 'react-router'
import ToggleView from '../../components/ToggleView'
import './Asignature.css'
import ViewTaskFromAsignature from './components/ViewTaskFromAsignature/ViewTaskFromAsignature'

const Asignature: React.FC = () => {
  const [viewTaskDone, setViewTaskDone] = useState<boolean>(false)
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
          <ToggleView
            viewTaskDone={viewTaskDone}
            setViewTaskDone={setViewTaskDone}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ViewTaskFromAsignature name={name} viewTaskDone={viewTaskDone} />
      </IonContent>
    </IonPage>
  )
}

export default Asignature
