import React from 'react'
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from '@ionic/react'

import { Asignature } from '../models/asignature.model'
import { useLocation } from 'react-router'
import { useStorage } from '../services/useStorage'

const AsignatureItem: React.FC<{ asignature: Asignature }> = ({
  asignature,
}) => {
  const { deleteAsignature } = useStorage()
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
        detail
        className={location.pathname === pathPag ? 'selected' : ''}
        routerLink={pathPag}
        lines="none"
      >
        <IonLabel>{asignature.name}</IonLabel>
      </IonItem>
    </IonItemSliding>
  )
}

export default AsignatureItem
