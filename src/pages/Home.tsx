import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import ViewToDoListItem from '../components/ViewToDoListItem'
import { Task } from '../models/task.model'
import { useStorage2 } from '../useStorage2'
import './Home.css'

const filterAllDoneTask = (allTask: Task[]) => {
  return allTask.filter((task) => task.done)
}

const filterAllDontDoneTask = (allTask: Task[]) => {
  return allTask.filter((task) => !task.done)
}

const Home: React.FC = () => {
  const { getAllTask } = useStorage2()
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
          {!viewTaskDone ? (
            <IonIcon slot="end" name="eye-off" color="tertiary"></IonIcon>
          ) : (
            <IonIcon slot="end" name="eye" color="success"></IonIcon>
          )}
          <IonToggle
            slot="end"
            value="Ver tareas realizadas"
            onClick={() => {
              viewTaskDone ? setViewTaskDone(false) : setViewTaskDone(true)
            }}
            color="success"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {viewTaskDone! ? (
          allTask.length > 0 ? (
            <ViewToDoListItem tasks={filterAllDoneTask(allTask)} />
          ) : (
            <p>No hay tareas disponibles</p>
          )
        ) : allTask.length > 0 ? (
          <ViewToDoListItem tasks={filterAllDontDoneTask(allTask)} />
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Home
