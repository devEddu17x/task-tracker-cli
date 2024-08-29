import { Injectable } from '@nestjs/common';
import { TaskStatus } from '../constants/status';

@Injectable()
export class AddService {
    addDefaultStatus(params: string[]): boolean {
        return true
    }

    addCustomStatus(params: string[], status: TaskStatus): boolean {
        return true;
    }
}
