import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonIcon,
  IonItem,
  IonSlide,
  IonSlides,
  useIonAlert,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { MiniTask } from '../../../../models/miniTask.model'
import { Task } from '../../../../models/task.model'
import { useStorage } from '../../../../services/useStorage'

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

interface Props {
  isExecuteForm: boolean
  setIsExecuteForm: (isExecuteForm: boolean) => void
  task: Task
}

const MiniTasks: React.FC<Props> = ({
  isExecuteForm,
  setIsExecuteForm,
  task,
}) => {
  const [miniTask, setMiniTask] = useState<MiniTask[]>([])
  const [presentAlert] = useIonAlert()
  const { getMiniTasksByTaskId } = useStorage()

  useEffect(() => {
    getMiniTasksByTaskId(task.id).then((miniTasks) => {
      setMiniTask(miniTasks)
    })
  }, [isExecuteForm, task.id])
  return (
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
  )
}

export default MiniTasks
