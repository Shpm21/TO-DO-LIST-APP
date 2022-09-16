import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonText,
} from '@ionic/react'
import { Task } from '../models/task.model'
import { SortIconsServices } from '../sortIconsServices'

interface Props {
  task: Task
  index: number
  setTaskAux: (task: Task) => void
  setShowPopover: (show: boolean) => void
  deleteTask: (id: string) => void
}

const formatDate = (date: string) => {
  const dateAux = new Date(date)
  return dateAux.toLocaleDateString()
}

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const sortIconServices = SortIconsServices.getInstance()

const TaskItem: React.FC<Props> = (Props) => {
  const { task, index, setTaskAux, setShowPopover, deleteTask } = Props
  const today = new Date(Date.now())

  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption
          color="danger"
          expandable
          onClick={() => deleteTask(task.id)}
        >
          <IonIcon name="trash-bin" size="large"></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        key={index}
        id={task.id}
        onClick={() => {
          setTaskAux(task)
          setShowPopover(false)
        }}
        lines="none"
      >
        <IonLabel key={index}>
          {
            <IonText>
              {' '}
              <h2>{task.name}</h2>{' '}
            </IonText>
          }
          <h3>{task.nameAsignature}</h3>
          <h3>
            {
              <IonText color={'tertiary'}>
                {days[new Date(task.date).getDay()]}
                {'  '}
                {parseInt(formatDate(task.date).split('/')[1])} de{'  '}
                {months[new Date(task.date).getMonth()]}
              </IonText>
            }
          </h3>
          <p>{task.description}</p>
        </IonLabel>
        <IonIcon
          name={sortIconServices.getSortIcon(today, task)}
          color={sortIconServices.getSortIconColor(today, task)}
        ></IonIcon>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          color="tertiary"
          expandable
          onClick={() => (task.done = true)}
        >
          <IonIcon name="checkmark-circle" size="large"></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}

export default TaskItem
