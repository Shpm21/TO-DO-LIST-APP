import React from 'react'

import { IonContent, IonList } from '@ionic/react'
import { Task } from '../models/task.model'
import { useStorage } from '../services/useStorage'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
}

const ViewToDoListItem: React.FC<Props> = (Props) => {
  const { deleteTask } = useStorage()
  return (
    <IonContent fullscreen>
      <IonList>
        {Props.tasks ? (
          Props.tasks.map((task, index) => {
            return (
              <TaskItem task={task} index={index} deleteTask={deleteTask} />
            )
          })
        ) : (
          <></>
        )}
      </IonList>
    </IonContent>
  )
}

export default ViewToDoListItem
