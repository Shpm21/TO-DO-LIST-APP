import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import FilterViewTask from '../../components/FilterViewTask'
import ToggleView from '../../components/ToggleView'
import { Task } from '../../models/task.model'
import { useStorage } from '../../services/useStorage'
import './Home.css'

const Home: React.FC = () => {
  const { getAllTask } = useStorage()
  const [allTask, setTasks] = useState<Task[]>([])
  const [viewTaskDone, setViewTaskDone] = useState<boolean>(false)

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
          <ToggleView
            viewTaskDone={viewTaskDone}
            setViewTaskDone={setViewTaskDone}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FilterViewTask tasks={allTask} viewTaskDone={viewTaskDone} />
      </IonContent>
    </IonPage>
  )
}

export default Home
