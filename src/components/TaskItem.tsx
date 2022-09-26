import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonText,
} from '@ionic/react'
import { useLocation } from 'react-router'
import { Task } from '../models/task.model'
import { DateServices } from '../services/dateServices'
import { SortIconsServices } from '../services/sortIconsServices'
import { useStorage } from '../services/useStorage'

interface Props {
  task: Task
  index: number
  deleteTask: (id: string) => void
}

const sortIconServices = SortIconsServices.getInstance()
const TaskItem: React.FC<Props> = (Props) => {
  const { task, index, deleteTask } = Props
  const today = new Date(Date.now())
  const { updateTask } = useStorage()
  const pathPag: string = `/task/${task.id}`
  const location = useLocation()

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
        detail
        key={index}
        id={task.id}
        className={location.pathname === pathPag ? 'selected' : ''}
        routerLink={pathPag}
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
                {DateServices.getDateInformationSpanish(task.date)}
              </IonText>
            }
          </h3>
          <p>{task.description}</p>
          <p>{task.priority}</p>
        </IonLabel>
        {task.done ? (
          <IonIcon name="checkmark-circle" color="success"></IonIcon>
        ) : (
          <IonIcon
            name={sortIconServices.getSortIcon(today, task)}
            color={sortIconServices.getSortIconColor(today, task)}
          ></IonIcon>
        )}
      </IonItem>
      {!task.done ? (
        <IonItemOptions side="end">
          <IonItemOption
            color="tertiary"
            expandable
            onClick={() =>
              updateTask(
                task.id,
                task.name,
                task.description,
                task.nameAsignature,
                task.priority,
                task.date,
                true,
              )
            }
          >
            <IonIcon name="checkmark-circle" size="large"></IonIcon>
          </IonItemOption>
        </IonItemOptions>
      ) : (
        <IonItemOptions side="end"></IonItemOptions>
      )}
    </IonItemSliding>
  )
}

export default TaskItem
