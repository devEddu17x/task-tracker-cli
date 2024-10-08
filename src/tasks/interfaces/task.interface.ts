import { TaskStatus } from "../constants/status";

export interface TaskInterface {
    id: number;
    description: string;
    status: TaskStatus;
    createAt: string;
    updatedAt: string;
}