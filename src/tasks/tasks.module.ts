import { Module } from '@nestjs/common';
import { AddCommand } from './commands/add.command';
import { AddService } from './services/add.service';

@Module({
  providers: [AddCommand, AddService]
})
export class TasksModule { }
