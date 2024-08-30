import { Command, CommandRunner, Option } from "nest-commander";
import { UpdateService } from "../services/update.service";
import { UpdateOptions } from "../interfaces/update-options.interface";
@Command({
    name: 'upd',
    description: 'Update a task',
})
export class UpdateCommand extends CommandRunner {
    constructor(private readonly updateService: UpdateService) {
        super();
    }
    async run(
        passedParams: string[],
        options?: UpdateOptions,
    ): Promise<void> {
        let result: boolean;
        if (options.description && options.status) {
            result = await this.updateService.updateBoth(Number(passedParams[0]), passedParams);
        } else if (options.description) {
            result = await this.updateService.updateTaskDescription(Number(passedParams[0]), passedParams);
        } else if (options.status) {
            result = await this.updateService.updateTaskStatus(Number(passedParams[0]));
        }
        console.log(result ? 'Task updated' : 'Failed to update task');
    }

    @Option({
        flags: '-s, --status',
        description: 'Set status of task',
    })
    parseStatus(val: string): boolean {
        return true;
    }

    @Option({
        flags: '-d, --description',
        description: 'Set status of task',
    })
    parseDescription(val: string): boolean {
        return true;
    }

}