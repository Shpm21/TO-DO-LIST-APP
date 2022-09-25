import { Task } from "../models/task.model";

export class SortIconsServices {

    private static _instance: SortIconsServices;
    private denominator = 10000000;
    private _statusColor = [
        'tertiary',
        'warning',
        'danger',
        'danger',
    ]

    private _statusIcon = [
        'time',
        'alert-circle',
        'warning',
        'sad'
    ]

    private constructor() {
    }

    public static getInstance(): SortIconsServices {
        if (!SortIconsServices._instance) {
            SortIconsServices._instance = new SortIconsServices();
        }

        return SortIconsServices._instance;
    }

    private getSortIconColorByDateDiff(dateDiff: number) {
        if (dateDiff < 0) {
            return this._statusColor[3];	
        }
        else if (0 <= dateDiff && dateDiff <= 15) {
            return this._statusColor[2];
        } else if (16 < dateDiff && dateDiff <= 45) {
            return this._statusColor[1];
        } else {
            return this._statusColor[0];
        }
    }

    private getSortIconByDateDiff(dateDiff: number) {
        if (dateDiff < 0) {
            return this._statusIcon[3];
        }
        if (0 <= dateDiff && dateDiff <= 15) {
            return this._statusIcon[2];
        } else if (16 < dateDiff && dateDiff <= 45) {
            return this._statusIcon[1];
        } else {
            return this._statusIcon[0];
        }
    }

    private getDateDiff(date1: Date, date2: Date) {
        return date1.getTime() - date2.getTime();
    }

    public getDateDiffMillisecond(today: Date, task: Task) {
        return this.getDateDiff(new Date(task.date), today);
    }

    public getSortIconColor(today: Date, task: Task) {
        const dateDiff = this.getDateDiff(new Date(task.date), today);
        return this.getSortIconColorByDateDiff(dateDiff / this.denominator);
    }

    public getSortIcon(today: Date, taks:Task) {
        const dateDiff = this.getDateDiff(new Date(taks.date), today);
        return this.getSortIconByDateDiff(dateDiff / this.denominator);
    }
}