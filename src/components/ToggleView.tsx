import { IonIcon, IonToggle } from '@ionic/react'

interface Props {
  viewTaskDone: boolean
  setViewTaskDone: (value: boolean) => void
}

const ToggleView: React.FC<Props> = ({ viewTaskDone, setViewTaskDone }) => {
  return (
    <>
      {!viewTaskDone ? (
        <IonIcon slot="end" name="eye-off" color="tertiary"></IonIcon>
      ) : (
        <IonIcon slot="end" name="eye" color="success"></IonIcon>
      )}
      <IonToggle
        slot="end"
        value="Ver tareas realizadas"
        onClick={() => {
          viewTaskDone ? setViewTaskDone(false) : setViewTaskDone(true)
        }}
        color="success"
      />
    </>
  )
}

export default ToggleView
