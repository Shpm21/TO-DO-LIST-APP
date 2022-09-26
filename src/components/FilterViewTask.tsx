import { IonContent } from '@ionic/react'
import { Task } from '../models/task.model'
import { FilterTasksServices } from '../services/filterTasksServices'
import ViewToDoListItem from './ViewToDoListItem'

interface Props {
  viewTaskDone: boolean
  tasks: Task[]
}

const filterTask: FilterTasksServices = FilterTasksServices.getInstance()
const FilterViewTask: React.FC<Props> = ({ viewTaskDone, tasks }) => {
  return (
    <IonContent>
      {viewTaskDone! ? (
        tasks.length > 0 ? (
          <ViewToDoListItem tasks={filterTask.filterTasks(tasks, 'd')} />
        ) : (
          <p>No hay tareas disponibles</p>
        )
      ) : tasks.length > 0 ? (
        <ViewToDoListItem tasks={filterTask.filterTasks(tasks, 'dd')} />
      ) : (
        <p>No hay tareas disponibles</p>
      )}
    </IonContent>
  )
}

export default FilterViewTask
