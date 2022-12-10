import { IonButton, IonIcon } from '@ionic/react'

interface Props {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}
const EditDoneButton: React.FC<Props> = ({ isEdit, setIsEdit }) => {
  return (
    <IonButton
      onClick={() => {
        setIsEdit(!isEdit)
      }}
      slot="end"
      color={'tertiary'}
    >
      {isEdit ? (
        <IonIcon name="checkmark"></IonIcon>
      ) : (
        <IonIcon name="pencil"></IonIcon>
      )}
    </IonButton>
  )
}

export default EditDoneButton
