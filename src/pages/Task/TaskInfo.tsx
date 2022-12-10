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
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AddMiniTask from './components/AddMiniTask/AddMiniTasks'
import { MiniTask } from '../../models/miniTask.model'
import { Task } from '../../models/task.model'
import { useStorage } from '../../services/useStorage'
import './TaskInfo.css'
import EditDoneButton from './components/EditDoneButton/EditDoneButton'
import ShowMiniTaskButton from './components/ShowMiniTaskButton/ShowMiniTaskButton'
import MiniTasks from './components/MiniTask/MiniTasks'
import ShowTaskInfo from './components/ShowTaskInfo/ShowTaskInfo'
import TaskInfoForm from './components/TaskInfoForm/TaskInfoForm'

interface Props {
  task: Task
}

const TaskInfo: React.FC<Props> = (Props) => {
  const [task, setTask] = useState<Task>()
  const [auxMiniTask, setAuxMiniTask] = useState<MiniTask[]>([])
  const [isExecuteForm, setIsExecuteForm] = useState<boolean>(false)
  const [showMiniTask, setShowMiniTask] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const { getTaskById, getMiniTasksByTaskId } = useStorage()

  useEffect(() => {
    const getAllMiniTask = async () => {
      const auxMiniTask = await getMiniTasksByTaskId(id)
      setAuxMiniTask(auxMiniTask)
    }
    getAllMiniTask()
  }, [id, showMiniTask])

  useEffect(() => {
    const getTaskInformation = async () => {
      const auxTask = await getTaskById(id)
      setTask(auxTask![0])
    }

    getTaskInformation()
  }, [id, isEdit])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" icon="chevron-back" />
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{task?.name}</IonTitle>
          <EditDoneButton isEdit={isEdit} setIsEdit={setIsEdit} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{task?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!isEdit ? (
          <ShowTaskInfo task={task!} />
        ) : (
          <TaskInfoForm task={task!} isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
        <ShowMiniTaskButton
          showMiniTask={showMiniTask}
          setShowMiniTask={setShowMiniTask}
        />
      </IonContent>
      {showMiniTask ? (
        !isExecuteForm ? (
          <MiniTasks
            isExecuteForm={isExecuteForm}
            setIsExecuteForm={setIsExecuteForm}
            task={task!}
          />
        ) : (
          <AddMiniTask idTask={id} setIsExecuteForm={setIsExecuteForm} />
        )
      ) : (
        <></>
      )}
    </IonPage>
  )
}

export default TaskInfo
