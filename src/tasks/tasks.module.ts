import { Module } from '@nestjs/common';
import { AddCommand } from './commands/add.command';
import { AddService } from './services/add.service';
import { AddQuestionsSet } from './questions/add.questions';
import { StorageService } from './services/storage.service';

@Module({
  providers: [AddCommand, AddService, AddQuestionsSet, StorageService],
})
export class TasksModule { }  