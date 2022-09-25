import { Task } from "../models/task.model"

export const sortDate = (allTask: Task[]) => {
    allTask.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }