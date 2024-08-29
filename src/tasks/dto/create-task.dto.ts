import { TaskStatus } from "../constants/status";

export class CreateTaskDto {
    description: string;
    status?: TaskStatus
}