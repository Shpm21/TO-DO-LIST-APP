import React, { useEffect, useState } from "react";

import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPopover,
  IonReorder,
  IonReorderGroup,
  IonText,
  ItemReorderEventDetail,
} from "@ionic/react";
import { Task } from "../models/task.model";
import { useStorage2 } from "../useStorage2";
import { useLocation } from "react-router";

interface Props {
  tasks: Task[];
}

const formatDate = (date: string) => {
  const dateAux = new Date(date);
  return dateAux.toLocaleDateString();
};

const ViewToDoListItem: React.FC<Props> = (Props) => {
  const [taskAux, setTaskAux] = useState<Task>();
  const [showPopover, setShowPopover] = useState(false);
  const { deleteTask } = useStorage2();

  const today = new Date(Date.now());
  const pathPag: string = `/task/${taskAux?.id}`;
  const location = useLocation();

  const isPriority = (task: Task) => {
    const dateAux = new Date(task.date);
    return dateAux.getDay() - today.getDay() <= 2;
  };

  const deleteT = async (id: string) => {
    await deleteTask(id);
  };
  return (
    <IonContent>
      <IonList>
        {Props.tasks ? (
          Props.tasks.map((task, index) => {
            return (
              <IonItemSliding>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="danger"
                    expandable
                    onClick={() => deleteTask(task.id)}
                  >
                  {/* <IonIcon name="trash" size="large"></IonIcon> */}
                  Eliminar
                  </IonItemOption>
                </IonItemOptions>
                <IonItem
                  key={index}
                  id={task.id}
                  onClick={() => {
                    setTaskAux(task);
                    setShowPopover(false);
                  }}
                >
                  <IonLabel key={index}>
                    {
                      <IonText color={isPriority(task) ? "danger" : ""}>
                        {" "}
                        <h2>{task.name}</h2>{" "}
                      </IonText>
                    }
                    <h3>{task.nameAsignature}</h3>
                    <h3>{formatDate(task.date)}</h3>
                    <p>{task.description}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="tertiary"
                    expandable
                    onClick={() => (task.done = true)}
                  >
                  {/* <IonIcon name="checkmark-circle" size="large"></IonIcon> */}
                  Completar
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })
        ) : (
          <></>
        )}
      </IonList>
      <IonPopover trigger={taskAux?.id} hidden={showPopover}>
        {showPopover ? (
          <></>
        ) : (
          <IonItem
            className={location.pathname === pathPag ? "selected" : ""}
            routerLink={pathPag}
          >
            <IonLabel onClick={() => setShowPopover(true)}>Ver más...</IonLabel>
          </IonItem>
        )}
      </IonPopover>
    </IonContent>
  );
};

export default ViewToDoListItem;
