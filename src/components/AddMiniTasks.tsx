import {
  IonContent,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react'
import { useState } from 'react'
import { useStorage2 } from '../useStorage2'

interface Props {
  idTask: string
  setIsExecuteForm: (value: boolean) => void
}

const AddMiniTask: React.FC<Props> = (Props) => {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [priority, setPriority] = useState<number>()
  const { idTask, setIsExecuteForm } = Props
  const { addMiniTask } = useStorage2()

  const addMiniTaskA = async (
    idTask: string,
    title: string,
    description: string,
    priority: number,
  ) => {
    await addMiniTask(idTask, title, description, priority)
    setTitle('')
    setDescription('')
    setPriority(0)
  }
  return (
    <IonContent>
      <IonItem>
        <IonInput
          placeholder="Titulo"
          required={true}
          value={title}
          type="text"
          onIonChange={(ev) => {
            setTitle(ev.detail.value!)
          }}
        />
      </IonItem>
      <IonItem>
        <IonInput
          placeholder="Descripción"
          value={description}
          required={true}
          onIonChange={(ev) => {
            setDescription(ev.detail.value!)
          }}
        />
      </IonItem>
      <IonItem>
        <IonSelect
          placeholder="Prioridad"
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
      {title && description && priority ? (
        <IonItem
          button
          onClick={() => {
            addMiniTaskA(idTask, title!, description, priority)
            setIsExecuteForm(false)
          }}
        >
          Añadir
        </IonItem>
      ) : (
        <IonItem button disabled>
          Añadir
        </IonItem>
      )}
      <IonItem
        button
        onClick={() => {
          setIsExecuteForm(false)
        }}
      >
        Cancelar
      </IonItem>
    </IonContent>
  )
}

export default AddMiniTask
