import React, { useEffect, useState } from 'react'
import {
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react'
import { useStorage2 } from '../../../../useStorage2'
import { Asignature } from '../../../../models/asignature.model'
import './addTask.css'

const AddTask: React.FC = () => {
  const [date, setDate] = useState<string>('')
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [priority, setPriority] = useState<number>()
  const [asignature, setAsignature] = useState<string>()

  const [asignatures, setAsignatures] = useState<Asignature[]>([])
  const { addTask, getAllAsignatures } = useStorage2()

  useEffect(() => {
    const getUpdateAsignatures = async () => {
      const asignaturesN = await getAllAsignatures()
      setAsignatures(() => asignaturesN)
    }
    getUpdateAsignatures()
  }, [])
  //ERROR NO SE ACTUALIZAN LAS ASIGNATURAS
  const addTaskA = async (
    name: string,
    description: string,
    nameAsignature: string,
    priority: number,
    date: string,
  ) => {
    await addTask(name, description, nameAsignature, priority, date)
    setName('')
    setDescription('')
    setAsignature('')
    setPriority(0)
    setDate('')
  }
  return (
    <IonContent>
      <IonText color={'tertiary'}>
        <h2>Añadir Tarea</h2>
      </IonText>
      <IonItem>
        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetime"
            presentation="date"
            preferWheel={true}
            onIonChange={(e) =>
              setDate(
                JSON.stringify(
                  new Date(
                    e.detail.value!.toLocaleString(),
                  ).toLocaleDateString(),
                ),
              )
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
        <IonInput
          placeholder="Nombre"
          required={true}
          value={name}
          type="text"
          onIonChange={(ev) => {
            setName(ev.detail.value!)
          }}
        />
      </IonItem>
      <IonItem>
        <IonSelect
          interface="popover"
          placeholder="Asignatura"
          value={asignature}
          onIonChange={(ev) => {
            setAsignature(ev.detail.value)
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
      {name && description && asignature && priority && date ? (
        <IonItem
          button
          onClick={() => {
            addTaskA(name!, description!, asignature!, priority, date!)
          }}
        >
          Añadir
        </IonItem>
      ) : (
        <IonItem button disabled>
          Añadir
        </IonItem>
      )}
    </IonContent>
  )
}

export default AddTask
