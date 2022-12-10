import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { Asignature } from '../../../../models/asignature.model'
import { Task } from '../../../../models/task.model'
import { useStorage } from '../../../../services/useStorage'

interface Props {
  task: Task
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const TaskInfoForm: React.FC<Props> = ({ task, isEdit, setIsEdit }) => {
  const [name, setName] = useState(task?.name)
  const [date, setDate] = useState(task?.date)
  const [nameAsignature, setNameAsignature] = useState(task?.nameAsignature)
  const [description, setDescription] = useState(task?.description)
  const [priority, setPriority] = useState<number>(task?.priority)
  const [asignatures, setAsignatures] = useState<Asignature[]>([])

  const { getAllAsignatures, updateTask } = useStorage()

  useEffect(() => {
    const getUpdateAsignatures = async () => {
      const asignaturesN = await getAllAsignatures()
      setAsignatures(() => asignaturesN)
    }
    getUpdateAsignatures()
  }, [])

  const updateTaskInfo = async (
    name: string,
    description: string,
    nameAsignature: string,
    priority: number,
    date: string,
  ) => {
    await updateTask(
      task.id,
      name,
      description,
      nameAsignature,
      priority,
      date,
      task.done,
    )
    setName('')
    setDescription('')
    setNameAsignature('')
    setPriority(0)
    setDate('')
  }

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">Nombre:</IonLabel>
        <IonInput
          value={name}
          onIonChange={(ev) => {
            setName(ev.detail.value!)
          }}
        />
      </IonItem>
      <IonItem>
        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetime"
            presentation="date"
            preferWheel={true}
            onIonChange={(e) =>
              setDate(JSON.stringify(new Date(e.detail.value!.toString())))
            }
            showDefaultButtons
            doneText="Hecho"
            cancelText="Cancelar"
            color={'tertiary'}
          ></IonDatetime>
        </IonModal>
        <IonIcon slot="end" name="calendar-outline" color="primary" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Asignatura:</IonLabel>
        <IonSelect
          interface="popover"
          placeholder={nameAsignature}
          value={nameAsignature}
          onIonChange={(ev) => {
            setNameAsignature(ev.detail.value)
          }}
        >
          {asignatures ? (
            asignatures.map((asignature, index) => {
              return (
                <IonSelectOption key={index} value={asignature.name}>
                  {asignature.name}
                </IonSelectOption>
              )
            })
          ) : (
            <IonSelectOption value="No hay asignaturas">
              No hay asignaturas
            </IonSelectOption>
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel class="ion-text-wrap">Descripción:</IonLabel>
        <IonInput
          value={description}
          onIonChange={(ev) => {
            setDescription(ev.detail.value!)
          }}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Prioridad:</IonLabel>
        <IonSelect
          interface="popover"
          value={priority}
          onIonChange={(ev) => {
            setPriority(parseInt(ev.detail.value))
          }}
        >
          <IonSelectOption value={1}>1</IonSelectOption>
          <IonSelectOption value={2}>2</IonSelectOption>
          <IonSelectOption value={3}>3</IonSelectOption>
          <IonSelectOption value={4}>4</IonSelectOption>
          <IonSelectOption value={5}>5</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonButton
          onClick={() => {
            alert(`DATE: ${date}`)
            updateTaskInfo(name, description, nameAsignature, priority, date)
            setIsEdit(false)
          }}
        >
          Guardar
        </IonButton>
      </IonItem>
    </>
  )
}

export default TaskInfoForm
