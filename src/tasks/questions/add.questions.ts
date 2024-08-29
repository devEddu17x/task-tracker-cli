import { Question, QuestionSet } from "nest-commander";
import { AddQuestions, TasksQuestions } from "../constants/questions";
import { TaskStatus } from "../constants/status";

@QuestionSet({
    name: TasksQuestions.Add,
})

export class AddQuestionsSet {

    @Question({
        type: 'list',
        name: AddQuestions.Status,
        message: 'Set status of task',
        choices: Object.values(TaskStatus),
    })

    status(value: string) {
        return value;
    }
}