import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TaskEntity } from '../entities/task.entity';
import { InquirerService } from 'nest-commander';
import { TasksQuestions } from '../constants/questions';

@Injectable()
export class UpdateService {
    constructor(
        private readonly storageService: StorageService,
        private readonly inquirerService: InquirerService,
    ) { }


    // todo: refactor those methods
    async updateTaskDescription(id: number, params: string[]): Promise<boolean> {
        const tasks: TaskEntity[] = await this.storageService.load();
        const task: TaskEntity = tasks[id - 1];
        if (!task) return false;
        task.description = params[1];
        tasks[id - 1] = task;
        this.storageService.saveAllAfterUpdate(tasks)
        return true;
    }

    async updateTaskStatus(id: number): Promise<boolean> {
        const tasks: TaskEntity[] = await this.storageService.load();
        const task: TaskEntity = tasks[id - 1]
        if (!task) return false;
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        task.status = answer.status;
        tasks[id - 1] = task;
        this.storageService.saveAllAfterUpdate(tasks)
        return true;
    }

    async updateBoth(id: number, params: string[]): Promise<boolean> {
        const tasks: TaskEntity[] = await this.storageService.load();
        const task: TaskEntity = tasks[id - 1]
        if (!task) return false;
        task.description = params[1];
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        task.status = answer.status;
        tasks[id - 1] = task;
        this.storageService.saveAllAfterUpdate(tasks)
        return true;
    }
}
