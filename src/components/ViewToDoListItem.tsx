import React, { useEffect, useState } from "react";

import { IonCard, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonReorder, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
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

    function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
      
        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        event.detail.complete();
      }
    return (
        <IonContent>
            <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
                    {
                        allTaskA ? allTaskA.map((task, index) => {
                            return (
                                <IonReorder>
                                    <IonItem key={index}>
                                        <IonLabel key={index}>
                                            <h2>{task.name}</h2>
                                            <h3>{task.nameAsignature}</h3>
                                            <p>{task.description}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonReorder>
                            )
                        })
                        :
                        <></>
                    }

            </IonReorderGroup>
        </IonContent>
    );
}

export default ViewToDoListItem;