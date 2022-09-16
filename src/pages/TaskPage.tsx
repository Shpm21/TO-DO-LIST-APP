import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Task } from '../models/task.model'
import { useStorage2 } from '../useStorage2'
import './Home.css'

interface Props {
  task: Task
}

const TaskPage: React.FC<Props> = (Props) => {
  const [task, setTask] = useState<Task>()
  const { id } = useParams<{ id: string }>()
  const { getTaskById } = useStorage2()

  useEffect(() => {
    const getTaskInformation = async () => {
      const auxTask = await getTaskById(id)
      setTask(auxTask![0])
    }
    getTaskInformation()
  }, [task])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{task?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{task?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel>
          <h2>Nombre: {task?.name}</h2>
          <h3>Fecha de entrega: {task?.date}</h3>
          <h3>Asignatura: {task?.nameAsignature}</h3>
          <h3>Estado: {task?.done ? 'Realizada' : 'Pendiente'}</h3>
          <p>Descripción: {task?.description}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  )
}

export default TaskPage
