import { IonItem, IonLabel } from '@ionic/react'
import { Task } from '../../../../models/task.model'
import { DateServices } from '../../../../services/dateServices'

interface Props {
  task: Task
}

const ShowTaskInfo: React.FC<Props> = ({ task }) => {
  return (
    <>
      <IonItem>
        <IonLabel position="stacked">Nombre: {task?.name}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">
          Fecha de entrega:{' '}
          {DateServices.getDateInformationSpanish(task?.date!)}
        </IonLabel>
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
    </>
  )
}

export default ShowTaskInfo
