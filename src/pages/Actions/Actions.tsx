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
import AddAsignature from './components/AddAsignature/AddAsignature'
import AddTask from './components/AddTask/AddTask'
import './Actions.css'

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

const Actions: React.FC = () => {
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
            <AddTask />
          </IonSlide>
          <IonSlide>
            <AddAsignature />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Actions
