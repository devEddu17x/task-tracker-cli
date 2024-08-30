import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TaskEntity } from '../entities/task.entity';
import { table } from 'src/utils/table';
import { ListOptions } from '../interfaces/list-options.interface';
import { conditions } from '../constants/conditions';

@Injectable()
export class ListService {
    constructor(private readonly storageService: StorageService) { }

    async getTasks(): Promise<TaskEntity[]> {
        return this.storageService.load();
    }
    async allTasks(): Promise<void> {
        const tasks: TaskEntity[] = await this.getTasks();
        if (tasks.length === 0) {
            console.log('No tasks added');
            return;
        }
        table(tasks)
    }

    async filter(options: ListOptions): Promise<void> {
        const tasks: TaskEntity[] = await this.getTasks();
        let filteredTasks: TaskEntity[]
        if (options?.done && (!options.inProgress && !options.notDone)) {
            filteredTasks = tasks.filter(conditions.done)
        }
        if (options?.inProgress && (!options.done && !options.notDone)) {
            filteredTasks = tasks.filter(conditions.inProgress)
        }
        if (options?.notDone && (!options.done && !options.inProgress)) {
            filteredTasks = tasks.filter(conditions.notDone)
        }
        if (filteredTasks && filteredTasks.length !== 0) {
            table(filteredTasks);
        } else {
            console.log('No tasks match the filters')
        }
    }
}
