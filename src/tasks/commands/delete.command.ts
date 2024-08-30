import { Command, CommandRunner, Option } from "nest-commander";
import { DeleteService } from "../services/delete.service";
import { DeleteOptions } from "../interfaces/delete-options.interface";

@Command({
    name: 'del',
    description: 'Delete a task',
})
export class DeleteCommand extends CommandRunner {
    constructor(
        private readonly deleteService: DeleteService,
    ) {
        super();
    }
    async run(passedParams: string[], options?: DeleteOptions): Promise<void> {
        let result: boolean;
        if (options.all) {
            result = await this.deleteService.deleteAll();
        } else {
            result = !passedParams[0] ? false : await this.deleteService.deleteTask(Number(passedParams[0]));
        }
        console.log(result ? (options.all ? 'All tasks has been deleted' : 'Task has been deleted') : 'Error during deleting tasks');
    }

    @Option({
        flags: '-a, --all',
        description: 'Delete all tasks',
    })
    parseAll(val: string): boolean {
        return true;
    }
}