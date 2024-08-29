import { TaskStatus } from "../constants/status";

export interface Task {
    id: number;
    description: string;
    status: TaskStatus;
    createAt: Date;
    updatedAt: Date;
}