import {
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

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { Asignature } from '../models/asignature.model';
import AsignatureItem from './AsignatureItem';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const asignatures : Asignature[] = [
  {
    name: "App Dist I",
    credit: 5
  },
  {
    name: "Emprendimiento",
    credit: 2
  },
  {
    name: "Com Efect II",
    credit: 2
  },
  {
    name: "Dibujo de Ing",
    credit: 5
  },
  {
    name: "Electivo",
    credit: 5
  }, 
  {
    name: "Proyecto Electivo",
    credit: 5
  },
  {
    name: "Etica",
    credit: 1
  },
  {
    name: "Ing de Datos I",
    credit: 5
  }
]

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Asignaturas</IonListHeader>
          {asignatures.map((asign, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <AsignatureItem asignature={asign} />
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

// return (
//   <IonMenu contentId="main" type="overlay">
//     <IonContent>
//       <IonList id="inbox-list">
//         <IonListHeader>Inbox</IonListHeader>
//         <IonNote>hi@ionicframework.com</IonNote>
//         {appPages.map((appPage, index) => {
//           return (
//             <IonMenuToggle key={index} autoHide={false}>
//               <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
//                 <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
//                 <IonLabel>{appPage.title}</IonLabel>
//               </IonItem>
//             </IonMenuToggle>
//           );
//         })}
//       </IonList>

//       <IonList id="labels-list">
//         <IonListHeader>Labels</IonListHeader>
//         {labels.map((label, index) => (
//           <IonItem lines="none" key={index}>
//             <IonIcon slot="start" icon={bookmarkOutline} />
//             <IonLabel>{label}</IonLabel>
//           </IonItem>
//         ))}
//       </IonList>
//     </IonContent>
//   </IonMenu>
// );
export default Menu;
