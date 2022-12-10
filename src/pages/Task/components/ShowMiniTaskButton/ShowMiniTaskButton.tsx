import { IonButton, IonIcon } from '@ionic/react'

interface Props {
  showMiniTask: boolean
  setShowMiniTask: (showMiniTask: boolean) => void
}

const ShowMiniTaskButton: React.FC<Props> = ({
  showMiniTask,
  setShowMiniTask,
}) => {
  return (
    <IonButton
      onClick={() => {
        setShowMiniTask(!showMiniTask)
      }}
      color={'tertiary'}
    >
      {showMiniTask ? (
        <IonIcon name="eye"></IonIcon>
      ) : (
        <IonIcon name="eye-off"></IonIcon>
      )}
    </IonButton>
  )
}

export default ShowMiniTaskButton
