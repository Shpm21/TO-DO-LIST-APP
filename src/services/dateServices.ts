import { Task } from "../models/task.model"

export class DateServices {
  private static _instance: DateServices

  private static _months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  private constructor() {}

  public static getInstance(): DateServices {
    if (!DateServices._instance) DateServices._instance = new DateServices()
    return DateServices._instance
  }

  public static sortDate(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }

  private static getDayMonthYear(date: string) {
    const d = new Date(date)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    return { day, month, year }
  }

  private static getMonthSpanish(month: number) {
    return this._months[month]
  }
  public static getDateInformationSpanish(date: string) {
    const { day, month, year } = DateServices.getDayMonthYear(date)
    return `${day} de ${DateServices.getMonthSpanish(month-1)} de ${year}`
  }

  public static getDateInformation(date: string) {
    const { day, month, year } = DateServices.getDayMonthYear(date)
    return `${day}/${month}/${year}`
  }
}
