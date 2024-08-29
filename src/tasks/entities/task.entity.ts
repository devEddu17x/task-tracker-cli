import { TaskStatus } from "../constants/status";
import { TaskInterface } from "../interfaces/task.interface";
export class TaskEntity implements TaskInterface {
    id: number;
    description: string;
    status: TaskStatus;
    createAt: string;
    updatedAt: string;
}