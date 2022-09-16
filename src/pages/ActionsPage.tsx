import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import AddAsignatureItem from '../components/AddAsignatureItem'
import AddTaskItem from '../components/AddTaskItem'
import './Home.css'

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}

const ActionsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Acciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides pager options={slideOpts}>
          <IonSlide>
            <AddTaskItem />
          </IonSlide>
          <IonSlide>
            <AddAsignatureItem />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

// const ActionsPage: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Acciones</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle size="large">Añadir Tarea</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <AddTaskItem />
//       </IonContent>
//       <IonContent>
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle size="large">Añadir Asignatura</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <AddAsignatureItem />
//       </IonContent>
//     </IonPage>
//   )
// }

export default ActionsPage
