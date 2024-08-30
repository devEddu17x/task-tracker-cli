import { Injectable } from '@nestjs/common';
import { TaskStatus } from '../constants/status';
import { InquirerService } from 'nest-commander';
import { TaskEntity } from '../entities/task.entity';
import { TasksQuestions } from '../constants/questions';
import { StorageService } from './storage.service';

@Injectable()
export class AddService {
    constructor(
        private readonly inquirerService: InquirerService,
        private readonly storageService: StorageService,
    ) { }

    async addDefaultStatus(params: string[]): Promise<boolean> {
        if (params.length === 0) return false;
        const task: TaskEntity = await this.getTask(params, null);
        await this.storageService.save(task);
        return true;
    }
    async addCustomStatus(params: string[]): Promise<boolean> {
        if (params.length === 0) return false;
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        const task: TaskEntity = await this.getTask(params, answer.status);
        await this.storageService.save(task);
        return true;
    }

    async getTask(params: string[], status: TaskStatus): Promise<TaskEntity> {
        const task: TaskEntity = {
            id: null,
            description: params[0],
            status: status || TaskStatus.ToDo,
            createAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }
        return task;
    }

}               