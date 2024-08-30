import { Module } from '@nestjs/common';
import { AddCommand } from './commands/add.command';
import { AddService } from './services/add.service';
import { AddQuestionsSet } from './questions/add.questions';

@Module({
  providers: [AddCommand, AddService, AddQuestionsSet],
})
export class TasksModule { }  