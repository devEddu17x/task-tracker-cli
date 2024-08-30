import { Command, CommandRunner, Option } from "nest-commander";
import { AddOptions } from "../interfaces/add-options.interface";
import { AddService } from "../services/add.service";

@Command({
    name: 'add',
    description: 'Add a task'
})
export class AddCommand extends CommandRunner {
    constructor(
        private readonly addService: AddService,
    ) {
        super();
    }
    async run(
        passedParam: string[],
        options?: AddOptions,
    ): Promise<void> {
        let result: boolean;
        if (!options.status) {
            result = await this.addService.addDefaultStatus(passedParam);
        } else {
            result = await this.addService.addCustomStatus(passedParam);
        }
        console.log(result ? 'Task added' : 'Failed to add task');
    }

    @Option({
        flags: '-s, --status',
        description: 'Set status of task',
    })
    parseStatus(val: string): boolean {
        return true;
    }
}