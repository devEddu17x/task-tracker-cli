import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';

@Injectable()
export class DeleteService {
    constructor(private readonly storageService: StorageService) { }
    async deleteAll(): Promise<boolean> {
        return await this.storageService.deleteAll();
    }
    async deleteTask(id: number): Promise<boolean> {
        const tasks = await this.storageService.load();
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            console.log('Task not found');
            return false;
        }
        tasks.splice(index, 1);
        await this.storageService.saveAllAfterUpdate(tasks);
        return true
    }
}
