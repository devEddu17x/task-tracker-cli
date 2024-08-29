import { Command, CommandRunner, Option } from "nest-commander";
import { AddOptions } from "../interfaces/add-options.interface";

@Command({
    name: 'add',
    description: 'Add a task'
})
export class AddCommand extends CommandRunner {
    constructor() {
        super();
    }
    async run(
        passedParam: string[],
        options?: AddOptions,
    ): Promise<void> {

    }

    @Option({
        flags: '-s, --status',
        description: 'Set status of task',
    })
    parseStatus(val: string): boolean {
        return true;
    }
}