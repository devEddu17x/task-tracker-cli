import { Module } from '@nestjs/common';
import { AddCommand } from './commands/add.command';
import { AddService } from './services/add.service';
import { AddQuestionsSet } from './questions/add.questions';
import { StorageService } from './services/storage.service';
import { ListCommand } from './commands/list.command';
import { ListService } from './services/list.service';
import { UpdateService } from './services/update.service';
import { UpdateCommand } from './commands/update.command';
import { DeleteService } from './services/delete.service';
import { DeleteCommand } from './commands/delete.command';

@Module({
  providers: [AddCommand, AddService, AddQuestionsSet, StorageService, ListCommand, ListService, UpdateService, UpdateCommand, DeleteCommand, DeleteService],
})
export class TasksModule { }  