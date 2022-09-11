import React, { useEffect, useState } from "react";
import { IonContent, IonInput, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useStorage } from "../useStorage";
import { Asignature } from "../models/asignature.model";

const AddTaskItem: React.FC = () => {
    const [date, setDate] = useState<string>();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [priority, setPriority] = useState<number>();
    const [asignature, setAsignature] = useState<string>();

    const [asignatures, setAsignatures] = useState<Asignature[]>([]);
    const { addTask, getAllAsignatures } = useStorage();

    useEffect(() => {
        const actionGetAllAsignatures = async () => {
          const allAsignatures = await getAllAsignatures();
          setAsignatures(allAsignatures);
        }
        actionGetAllAsignatures();
      }, [asignatures]);

    const addTaskA = async (name: string, description: string, nameAsignature: string, priority: number, date: string) => {
        await addTask(name, description, nameAsignature, priority, date);
        setName('');
        setDescription('');
        setAsignature('');
        setPriority(0);
        setDate(' ');
    }

    return (
      <IonContent>
        <IonItem>
            <IonInput placeholder="Fecha" required={true} type="date" onIonChange={ev => {setDate(JSON.stringify(ev.detail.value))}} />
        </IonItem>
        <IonItem>
            <IonInput placeholder="Nombre" required={true} value={name} type="text" onIonChange={ev => { setName(ev.detail.value!)}} />
        </IonItem>
        <IonItem>
            <IonSelect placeholder="Asignatura" value={asignature} onIonChange={ev => {setAsignature(ev.detail.value)}}>
                {
                    asignatures? asignatures.map((asignature, index) => {
                        return (
                            <IonSelectOption key={index} value={asignature.name}>{asignature.name}</IonSelectOption>
                        );
                    }) :
                    <IonSelectOption value="No hay asignaturas">No hay asignaturas</IonSelectOption>
                }
            </IonSelect>
        </IonItem>
        <IonItem>
            <IonInput placeholder="Descripción" value={description} required={true} onIonChange={ev => { setDescription(ev.detail.value!)}} />
        </IonItem>
        <IonItem>
            <IonSelect placeholder="Prioridad" value={priority} onIonChange={ev => {setPriority(parseInt(ev.detail.value))}} >
                <IonSelectOption value={1}>1</IonSelectOption>
                <IonSelectOption value={2}>2</IonSelectOption>
                <IonSelectOption value={3}>3</IonSelectOption>
                <IonSelectOption value={4}>4</IonSelectOption>
                <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
        </IonItem>
        {
            name && description && asignature && priority && date ? <IonItem button onClick={() => {addTaskA
            (name!, description!, asignature!, priority, date!) 
            }}>Añadir</IonItem> : <IonItem button disabled>Añadir</IonItem>
        }
      </IonContent>
    );
}

export default AddTaskItem;