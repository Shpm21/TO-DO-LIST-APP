import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ViewTaskFromAsignatureItem from '../components/ViewTaskFromAsignatureItem';
import { useParams } from 'react-router';
import './Page.css';

const AsignaturePage: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ViewTaskFromAsignatureItem name={name}/>
      </IonContent>
    </IonPage>
  );
};

export default AsignaturePage;