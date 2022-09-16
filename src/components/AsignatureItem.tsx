import React from 'react'
import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from '@ionic/react'

import { Asignature } from '../models/asignature.model'
import { useLocation } from 'react-router'
import { useStorage2 } from '../useStorage2'

const AsignatureItem: React.FC<{ asignature: Asignature }> = ({
  asignature,
}) => {
  const { deleteAsignature } = useStorage2()
  const deleteA = async (name: string) => {
    await deleteAsignature(name)
  }

  const location = useLocation()
  const pathPag: string = `/page/${asignature.name}`
  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption
          color="danger"
          expandable
          onClick={() => deleteA(asignature.name)}
        >
          <IonIcon name="trash-bin"></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        className={location.pathname === pathPag ? 'selected' : ''}
        routerLink={pathPag}
      >
        <IonLabel>{asignature.name}</IonLabel>
      </IonItem>
    </IonItemSliding>
  )
}

export default AsignatureItem
