import React from "react";
import { IonButton, IonItem, IonLabel } from "@ionic/react";

import { Asignature } from "../models/asignature.model";
import { useLocation, useParams } from "react-router";
import { useStorage } from "../useStorage";

const AsignatureItem: React.FC<{asignature: Asignature}> = ({asignature}) => {

    const { deleteAsignature } = useStorage();
    const deleteA = async (name: string) => {
        await deleteAsignature(name);
    }
    const location = useLocation();
    const pathPag: string = `/page/${asignature.name}`;
    return (
        <IonItem>

            <IonItem className={location.pathname === pathPag ? 'selected': ''} routerLink={pathPag}>
                <IonLabel>{asignature.name}</IonLabel>
            </IonItem>
            <IonItem >
                <IonButton onClick={ () => deleteA(asignature.name)} >x</IonButton>
            </IonItem>
        </IonItem>
    );
}

export default AsignatureItem;