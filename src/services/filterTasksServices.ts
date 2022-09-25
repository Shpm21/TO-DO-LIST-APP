import { Task } from "../models/task.model";
import { sortDate } from "./dateServices";

export class FilterTasksServices {
    private static FilterTasksServicesInstance: FilterTasksServices;

    constructor () {
        if (FilterTasksServices.FilterTasksServicesInstance) {
            return FilterTasksServices.FilterTasksServicesInstance;
        }
        FilterTasksServices.FilterTasksServicesInstance = this;
    }

    filterTasks(tasks: Task[], key: string): Task[] {
        sortDate(tasks);
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