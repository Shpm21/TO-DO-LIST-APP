import React, { useEffect, useState } from 'react'
import { IonContent } from '@ionic/react'
import { Task } from '../../../../models/task.model'
import { useStorage } from '../../../../services/useStorage'
import { FilterTasksServices } from '../../../../services/filterTasksServices'
import FilterViewTask from '../../../../components/FilterViewTask'

interface ContainerProps {
  name: string
  viewTaskDone: boolean
}

const ViewTaskFromAsignature: React.FC<ContainerProps> = ({
  name,
  viewTaskDone,
}) => {
  const [task, setAllTask] = useState<Task[]>([])
  const { getTaskByNameAsignature } = useStorage()

  useEffect(() => {
    const actionGetAllTaskFromAsignature = async () => {
      const auxTask = await getTaskByNameAsignature(name)
      setAllTask(auxTask)
    }
    actionGetAllTaskFromAsignature()
  })
  return (
    <IonContent>
      <FilterViewTask tasks={task} viewTaskDone={viewTaskDone} />
    </IonContent>
  )
}

export default ViewTaskFromAsignature
