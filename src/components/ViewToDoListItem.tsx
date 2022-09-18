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
import { useLocation } from 'react-router'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
}

const ViewToDoListItem: React.FC<Props> = (Props) => {
  const [taskAux, setTaskAux] = useState<Task>()
  const [showPopover, setShowPopover] = useState(false)
  const { deleteTask } = useStorage2()
  return (
    <IonContent fullscreen>
      <IonList>
        {Props.tasks ? (
          Props.tasks.map((task, index) => {
            return (
              <TaskItem
                task={task}
                index={index}
                setTaskAux={setTaskAux}
                setShowPopover={setShowPopover}
                deleteTask={deleteTask}
              />
            )
          })
        ) : (
          <></>
        )}
      </IonList>
      {/* <IonPopover trigger={taskAux?.id} hidden={showPopover}>
        {showPopover ? (
          <></>
        ) : (
          <IonItem
            className={location.pathname === pathPag ? 'selected' : ''}
            routerLink={pathPag}
          >
            <IonLabel onClick={() => setShowPopover(true)}>Ver más...</IonLabel>
          </IonItem>
        )}
      </IonPopover> */}
    </IonContent>
  )
}

export default ViewToDoListItem
