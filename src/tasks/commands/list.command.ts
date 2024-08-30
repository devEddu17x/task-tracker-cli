import { Command, CommandRunner, Option } from "nest-commander";
import { ListOptions } from "../interfaces/list-options.interface";
import { ListService } from "../services/list.service";

@Command({
    name: 'list',
    description: 'List all tasks'
})
export class ListCommand extends CommandRunner {
    constructor(
        private readonly listService: ListService,
    ) {
        super();
    }
    async run(
        passedParam: string[],
        options?: ListOptions,
    ): Promise<void> {
        if (Object.keys(options).length === 0) {
            this.listService.allTasks();
            return;
        }
        await this.listService.filter(options);
    }


    @Option({
        flags: '-d, --done',
        description: 'All tasks done',
    })
    parseDone(val: string) {
        return true;
    }

    @Option({
        flags: '-n, --not-done',
        description: 'All tasks not done',
    })
    parseNotDone(val: string) {
        return true;
    }

    @Option({
        flags: '-p, --in-progress',
        description: 'All tasks in progress',
    })
    parseInProgress(val: string) {
        return true;
    }
}