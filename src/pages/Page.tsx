import { IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ViewToDoListItem from '../components/ViewToDoListItem';
import { Task } from '../models/task.model';
import { useStorage2 } from '../useStorage2';
import './Page.css';

const LoadTasks = async () => {
  const { getAllTask } = useStorage2();
  const tasks: Task[] = await getAllTask();
  return tasks!;
}


const Page: React.FC = () => {
  const [allTaskA, setAllTaskA]  = useState<Task[]>([]);
  const { getAllTask } = useStorage2();

  const loadTasks = async () => {
    const tasks: Task[] = await getAllTask();
    setAllTaskA(tasks!);
  }
  loadTasks();
  useEffect(() => {
    const acctionGetAllTask = async () => {
      const tasks = await getAllTask();
      setAllTaskA(tasks);
    }
    acctionGetAllTask();
  });
//ACA QUEDE
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle onClick={async () => {alert(`TASKS: ${JSON.stringify(setAllTaskA(await getAllTask()))}`)}}>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" onClick={() => {alert(`TASKS: ${JSON.stringify(allTaskA)}`)}}>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          allTaskA.length > 0 ?
          <ViewToDoListItem tasks={allTaskA} /> :
          <p> No hay tareas</p>
        }
      </IonContent>
    </IonPage>

  );
};

export default Page;
