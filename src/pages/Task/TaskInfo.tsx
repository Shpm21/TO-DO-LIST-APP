import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AddMiniTask from './components/AddMiniTask/AddMiniTasks'
import { MiniTask } from '../../models/miniTask.model'
import { Task } from '../../models/task.model'
import { useStorage2 } from '../../useStorage2'
import './TaskInfo.css'

interface Props {
  task: Task
}

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}

const TaskInfo: React.FC<Props> = (Props) => {
  const [task, setTask] = useState<Task>()
  const [miniTask, setMiniTask] = useState<MiniTask[]>([])
  const [auxMiniTask, setAuxMiniTask] = useState<MiniTask[]>([])
  const [isExecuteForm, setIsExecuteForm] = useState<boolean>(false)
  const [showMiniTask, setShowMiniTask] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const { getTaskById, getMiniTasksByTaskId } = useStorage2()
  const [presentAlert] = useIonAlert()

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
  }, [id])

  useEffect(() => {
    setMiniTask(auxMiniTask)
  }, [auxMiniTask])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" icon="chevron-back" />
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
        <IonItem>
          <IonLabel position="stacked">Nombre: {task?.name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Fecha de entrega: {task?.date}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Asignatura: {task?.nameAsignature}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Estado: {task?.done ? 'Realizada' : 'Pendiente'}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-text-wrap">
            <h6>Descripción: {task?.description}</h6>
          </IonLabel>
        </IonItem>
        {!showMiniTask ? (
          <IonButton
            color={'tertiary'}
            onClick={() => {
              setShowMiniTask(true)
            }}
          >
            {' '}
            Ver mini-tareas
          </IonButton>
        ) : (
          <IonButton color={'tertiary'} onClick={() => setShowMiniTask(false)}>
            {' '}
            Ocultar mini-tareas
          </IonButton>
        )}
      </IonContent>
      {showMiniTask ? (
        !isExecuteForm ? (
          <IonContent>
            <IonSlides pager options={slideOpts}>
              <IonSlide
                onClick={() => {
                  setIsExecuteForm(true)
                }}
              >
                <IonCard>
                  <IonItem lines="none">
                    <IonIcon name="add" size="large" color="tertiary"></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSlide>
              {miniTask ? (
                miniTask.map((task) => (
                  <IonSlide
                    onClick={() =>
                      presentAlert({
                        header: task.title,
                        buttons: ['Cerrar'],
                        message: task.description,
                      })
                    }
                  >
                    <IonCard color={'tertiary'}>
                      <IonCardHeader>
                        <IonCardSubtitle>{task.title}</IonCardSubtitle>
                        {/* <IonCardTitle>{task.title}</IonCardTitle> */}
                      </IonCardHeader>
                    </IonCard>
                  </IonSlide>
                ))
              ) : (
                <></>
              )}
            </IonSlides>
          </IonContent>
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
