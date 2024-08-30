import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TaskEntity } from '../entities/task.entity';
import { InquirerService } from 'nest-commander';
import { TasksQuestions } from '../constants/questions';
import { TaskStatus } from '../constants/status';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class UpdateService {
    constructor(
        private readonly storageService: StorageService,
        private readonly inquirerService: InquirerService,
    ) { }


    async updateTaskDescription(id: number, params: string[]): Promise<boolean> {
        const tasks: TaskEntity[] = await this.storageService.load();
        const result: boolean = await this.updateTaskById(tasks, { id, description: params[1] });
        if (!result) return false;
        await this.storageService.saveAllAfterUpdate(tasks);
        return true;
    }

    async updateTaskStatus(id: number): Promise<boolean> {
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        const tasks: TaskEntity[] = await this.storageService.load();
        const result: boolean = await this.updateTaskById(tasks, { id, status: answer.status });
        if (!result) return false;
        await this.storageService.saveAllAfterUpdate(tasks);
        return true;
    }

    async updateBoth(id: number, params: string[]): Promise<boolean> {
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        const tasks: TaskEntity[] = await this.storageService.load();
        const result: boolean = await this.updateTaskById(tasks, { id, description: params[1], status: answer.status });
        if (!result) return false;
        await this.storageService.saveAllAfterUpdate(tasks);
        return true;
    }

    async updateTaskById(tasks: TaskEntity[], updateTaskDto: UpdateTaskDto): Promise<boolean> {
        const task: TaskEntity = tasks[updateTaskDto.id - 1];
        if (!task) return false;
        task.description = updateTaskDto.description || task.description;
        task.status = updateTaskDto.status || task.status;
        task.updatedAt = new Date().toLocaleString();
        tasks[updateTaskDto.id - 1] = task;
        return true;
    }
}
