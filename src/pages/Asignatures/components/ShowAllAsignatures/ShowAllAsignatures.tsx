import { IonContent, IonList, IonListHeader, IonMenuToggle } from '@ionic/react'
import { useEffect, useState } from 'react'
import { Asignature } from '../../../../models/asignature.model'
import { useStorage2 } from '../../../../useStorage2'
import AsignatureItem from '../../../../components/AsignatureItem'

const ShowAllAsignatures: React.FC = () => {
  const [asignatures, setAsignatures] = useState<Asignature[]>([])
  const { getAllAsignatures } = useStorage2()

  useEffect(() => {
    const actionGetAllAsignatures = async () => {
      const allAsignatures = await getAllAsignatures()
      setAsignatures(allAsignatures)
    }
    actionGetAllAsignatures()
  })
  return (
    <IonContent>
      <IonList id="inbox-list">
        {asignatures.map((asign, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <AsignatureItem asignature={asign} />
            </IonMenuToggle>
          )
        })}
      </IonList>
    </IonContent>
  )
}

export default ShowAllAsignatures
