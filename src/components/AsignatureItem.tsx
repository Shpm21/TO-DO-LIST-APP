import React from "react";
import { IonItem, IonLabel } from "@ionic/react";

import { Asignature } from "../models/asignature.model";

const AsignatureItem: React.FC<{asignature: Asignature}> = ({asignature}) => {
    return (
        <IonItem>
            <IonLabel>{asignature.name}</IonLabel>
        </IonItem>
    );
}

export default AsignatureItem;