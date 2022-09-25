import React, { useState } from 'react'

import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from '@ionic/react'
import { Task } from '../models/task.model'
import { useStorage2 } from '../useStorage2'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
}

const ViewToDoListItem: React.FC<Props> = (Props) => {
  const { deleteTask } = useStorage2()
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
