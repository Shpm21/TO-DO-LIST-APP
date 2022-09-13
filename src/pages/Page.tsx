import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import ViewToDoListItem from '../components/ViewToDoListItem'
import { Task } from '../models/task.model'
import { useStorage2 } from '../useStorage2'
import './Page.css'

const Page: React.FC = () => {
  const { getAllTask } = useStorage2()
  const [allTask, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getTaskInformation = async () => {
      const tasks: Task[] = await getAllTask()
      setTasks(tasks)
    }
    getTaskInformation()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tareas Pendientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {allTask.length > 0 ? (
          <ViewToDoListItem tasks={allTask} />
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Page
