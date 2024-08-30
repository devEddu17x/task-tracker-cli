import { Injectable } from '@nestjs/common';
import { TaskStatus } from '../constants/status';
import { InquirerService } from 'nest-commander';
import { TaskEntity } from '../entities/task.entity';
import { TasksQuestions } from '../constants/questions';
import { getStatus } from '../constants/get-status';
import { StorageService } from './storage.service';

@Injectable()
export class AddService {
    constructor(
        private readonly inquirerService: InquirerService,
        private readonly storageService: StorageService,
    ) { }

    async addDefaultStatus(params: string[]): Promise<boolean> {
        if (params.length === 0) return false;
        const task: TaskEntity = {
            id: 1,
            description: params[0],
            status: TaskStatus.ToDo,
            createAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }
        await this.storageService.save(task);
        return true;
    }
    async addCustomStatus(params: string[]): Promise<boolean> {
        if (params.length === 0) return false;
        const answer = await this.inquirerService.ask(TasksQuestions.Add, undefined);
        const task: TaskEntity = {
            id: 1,
            description: params[0],
            status: getStatus[answer.toString()] || TaskStatus.ToDo,
            createAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }

        await this.storageService.save(task);
        return true;
    }

}               