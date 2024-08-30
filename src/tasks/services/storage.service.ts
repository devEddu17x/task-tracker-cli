import { Injectable } from '@nestjs/common';
import path from 'path';
import { TaskEntity } from '../entities/task.entity';
import * as os from 'node:os'
import fs from 'fs/promises';
@Injectable()
export class StorageService {
    private readonly filePath: string;
    constructor() {
        try {
            this.filePath = this.getFilePath();
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }


    private getFilePath(): string {
        const home: string = os.homedir();
        const app = 'tasks-cli';
        const file = 'tasks.json';
        switch (process.platform) {
            case 'win32':
                return path.join(home, 'AppData', 'Roaming', app, file);
            case 'darwin':
                return path.join(home, 'Library', 'Application Support', app, file);
            default:
                return path.join(home, '.config', app, file);
        }
    }

    async save(data: TaskEntity) {
        await fs.mkdir(path.dirname(this.filePath), { recursive: true });
        const tasks: TaskEntity[] = await this.load();
        data.id = tasks.length + 1;
        tasks.push(data);
        await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
    }

    async saveAllAfterUpdate(tasks: TaskEntity[]) {
        await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
    }

    async load(): Promise<TaskEntity[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const tasks: TaskEntity[] = JSON.parse(data);
            return tasks;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            console.log('Error during loading:\n', error);
        }
    }

    async deleteAll(): Promise<boolean> {
        try {
            await fs.unlink(this.filePath);
            return true;
        } catch (error) {
            console.log('Error during deleting:\n', error);
            return false;
        }
    }
}
