import React, { useEffect, useState } from "react";

import { IonButton, IonCard, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPopover, IonReorder, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import { Task } from "../models/task.model";
import ViewTaskInformationItem from "./ViewTaskInformationItem";
import { useStorage2 } from "../useStorage2";
import { useLocation } from "react-router";

interface Props {
    tasks: Task[];
}

const ViewToDoListItem: React.FC<Props> = (Props) => {
    const [taskAux, setTaskAux] = useState<Task>();

    const { deleteTask } = useStorage2();
    const pathPag: string = `/task/${taskAux?.id}`;
    const location = useLocation();

    const deleteT = async (id: string) => {
        await deleteTask(id);
    }
    return (
        <IonContent>
            <IonList>
                {
                    Props.tasks ? Props.tasks.map((task, index) => {
                        return (
                            <IonItem >
                                <IonItem  key={index} id={task.id} onClick={() => setTaskAux(task)}>
                                    <IonLabel key={index}>
                                        <h2>{task.name}</h2>
                                        <h3>{task.nameAsignature}</h3>
                                        <p>{task.description}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button onClick={ () => deleteT(task.id)}>x<IonItem />

                                </IonItem>
                            </IonItem>
                        )
                    })
                    :
                    <></>
                    }
            </IonList>
            <IonPopover trigger={taskAux?.id}>
                <IonItem className={location.pathname === pathPag ? 'selected': ''} routerLink={pathPag}>
                    <IonLabel>Ver más...</IonLabel>
                </IonItem>
            </IonPopover>
        </IonContent>
    );
}

export default ViewToDoListItem;