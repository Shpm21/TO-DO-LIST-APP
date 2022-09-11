import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import './Menu.css';
import AsignatureItem from './AsignatureItem';
import { Asignature } from "../models/asignature.model";
import { useEffect, useState } from 'react';
import { useStorage } from '../useStorage';



const Menu: React.FC = () => {
  const [asignatures, setAsignatures] = useState<Asignature[]>([]);
  const { getAllAsignatures, asignature } = useStorage();

  useEffect(() => {
    const actionGetAllAsignatures = async () => {
      const allAsignatures = await getAllAsignatures();
      setAsignatures(allAsignatures);
    }
    actionGetAllAsignatures();
  }, [asignatures]);



  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
      <IonList id="inbox-list">
          <IonListHeader>Acciones</IonListHeader>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink='/home'>
              <IonLabel>
                  Tareas Pendientes
                </IonLabel>            
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink='/addTask'>
              <IonLabel>
                Añadir Tarea
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false} onClick={() => console.log('CLICK ADD ASIGNATURE')}>
            <IonItem routerLink='/addAsignature'>
              <IonLabel>
                Añadir Asignatura
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList id="inbox-list">
          <IonListHeader>Asignaturas Disponibles</IonListHeader>
          {asignatures ? asignatures.map((asign, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <AsignatureItem asignature={asign}  />
              </IonMenuToggle>
            );
          }) :
            <></>
        }
        </IonList>
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
