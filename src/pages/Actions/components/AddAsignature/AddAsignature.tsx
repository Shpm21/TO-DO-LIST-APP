import React, { useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react'
import { useStorage2 } from '../../../../useStorage2'
import './AddAsignature.css'

const AddAsignatureItem: React.FC = () => {
  const [name, setName] = useState<string>()
  const [credit, setCredit] = useState<number>()
  const { addAsignature } = useStorage2()
  const addAsignatureA = async (name: string, credit: number) => {
    await addAsignature(name, credit)
    setName('')
    setCredit(0)
  }

  return (
    <IonContent>
      <IonText color={'tertiary'}>
        <h2>Añadir Asignatura</h2>
      </IonText>
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
          placeholder="Créditos"
          interface="popover"
          value={credit}
          onIonChange={(ev) => {
            setCredit(parseInt(ev.detail.value))
          }}
        >
          <IonSelectOption value={1}>1</IonSelectOption>
          <IonSelectOption value={2}>2</IonSelectOption>
          <IonSelectOption value={3}>3</IonSelectOption>
          <IonSelectOption value={4}>4</IonSelectOption>
          <IonSelectOption value={5}>5</IonSelectOption>
        </IonSelect>
      </IonItem>
      {name && credit ? (
        <IonItem button onClick={() => addAsignatureA(name!, credit!)}>
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

export default AddAsignatureItem
