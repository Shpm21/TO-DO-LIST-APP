import React, { useEffect, useState } from 'react'
import { IonContent, IonItem, IonLabel, IonList } from '@ionic/react'
import { Task } from '../../../../models/task.model'
import { useStorage2 } from '../../../../useStorage2'
import ViewToDoListItem from '../../../../components/ViewToDoListItem'

interface ContainerProps {
  name: string
}

const ViewTaskFromAsignature: React.FC<ContainerProps> = ({ name }) => {
  const [task, setAllTask] = useState<Task[]>([])
  const { getTaskByNameAsignature } = useStorage2()

  useEffect(() => {
    const actionGetAllTaskFromAsignature = async () => {
      const auxTask = await getTaskByNameAsignature(name)
      setAllTask(auxTask)
    }
    actionGetAllTaskFromAsignature()
  })
  return (
    <IonContent>
      {task.length > 0 ? (
        <ViewToDoListItem tasks={task} />
      ) : (
        <p>No hay tareas disponibles</p>
      )}
    </IonContent>
  )
}

export default ViewTaskFromAsignature
