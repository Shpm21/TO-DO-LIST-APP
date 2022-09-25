import { IonButton, IonItem, IonLabel, IonPopover } from '@ionic/react'
import { Task } from '../models/task.model'

interface Props {
  task: Task
  key: number
}

const ViewTaskInformationItem: React.FC<Props> = (Props) => {
  let idButton: string = 'trigger' + Props.key
  return (
    <IonItem>
      <IonButton id={idButton}>view</IonButton>
      <IonPopover trigger={idButton}>
        <IonItem>
          <IonLabel>Nombre: {Props.task.name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Asignatura: {Props.task.nameAsignature}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Descripción: {Props.task.description}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Fecha de entrega: {Props.task.date}</IonLabel>
        </IonItem>
      </IonPopover>
    </IonItem>
  )
}

export default ViewTaskInformationItem
