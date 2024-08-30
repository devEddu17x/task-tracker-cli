import { TaskEntity } from "../entities/task.entity";
import { TaskStatus } from "./status";

export const conditions = {
    done: (task: TaskEntity) => task.status === TaskStatus.Done,
    notDone: (task: TaskEntity) => task.status !== TaskStatus.Done,
    inProgress: (task: TaskEntity) => task.status === TaskStatus.InProgress,
}