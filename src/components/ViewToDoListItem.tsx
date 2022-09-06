import React, { useEffect, useState } from "react";

import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { Task } from "../models/task.model";
import { useStorage } from "../useStorage";

const ViewToDoListItem: React.FC = () => {
    const [allTaskA, setAllTaskA]  = useState<Task[]>([]);
    const { allTask , getAllTask, getTaskByNameAsignature } = useStorage();

    useEffect(() => {
        const acctionGetAllTask = async () => {
            await getAllTask();
            setAllTaskA(allTask);
        }
        acctionGetAllTask();
    });

    return (
        <IonContent>
            <IonList>
                <IonListHeader>To do List</IonListHeader>
                {
                    allTaskA ? allTaskA.map((task, index) => {
                        return (
                            <IonItem key={index}>
                                <IonLabel>
                                    <h2>{task.name}</h2>
                                    <h3>{task.nameAsignature}</h3>
                                    <p>{task.description}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                    :
                    <></>
                }
            </IonList>
        </IonContent>
    );
}

export default ViewToDoListItem;