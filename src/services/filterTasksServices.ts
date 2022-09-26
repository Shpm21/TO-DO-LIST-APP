import { Task } from "../models/task.model";
import { DateServices } from "./dateServices";

export class FilterTasksServices {
    private static FilterTasksServicesInstance: FilterTasksServices;

    private constructor () {
    }

    public static getInstance(): FilterTasksServices {
        if (!FilterTasksServices.FilterTasksServicesInstance) FilterTasksServices.FilterTasksServicesInstance = new FilterTasksServices();
        return FilterTasksServices.FilterTasksServicesInstance;
    }
    filterTasks(tasks: Task[], key: string): Task[] {
        DateServices.sortDate(tasks);
        switch (key) {
            case 'd':
                return this.filterDoneTasks(tasks);
            case 'dd':
                return this.filterDontDoneTasks(tasks);
            default:
                return tasks;
        }
    }
    private filterDoneTasks(tasks: Task[]): Task[] {
        return tasks.filter((task: Task) => task.done);
    }

    private filterDontDoneTasks(tasks: Task[]): Task[] {
        return tasks.filter((task: Task) => !task.done);
    }
}