# Task-cli

`task-cli` is a Command Line Interface (CLI) tool designed to manage tasks, allowing you to create, list, update, and delete tasks effortlessly.

## Features

- Create tasks with or without a predefined status.
- List tasks with filters based on status.
- Update task descriptions and statuses.
- Delete individual tasks or all tasks at once.

## Installation

To install `task-cli` globally via npm, run:

```bash
npm install -g task-cli
```

Once installed, you can run the CLI using the `task` command.

## Usage

The main command to start using the CLI is `task`. Below are the available subcommands and their options:

### 1. Add a Task

You can add a new task using the `add` command. The task description is required, and you can optionally set the status.

```bash
task add "[description]"
```

- By default, the task will be created with the status `TO_DO`.
- If you add the `-s` or `--status` option, a menu will appear, allowing you to select the task's status from the following options:
  - `TO_DO`
  - `IN_PROGRESS`
  - `DONE`

#### Examples:

```bash
$ task add "Finish CLI project"
# Adds a task with description "Finish CLI project" and status TO_DO

$ task add "Finish CLI project" -s
# Adds a task with description "Finish CLI project" and lets you choose the status
```

### 2. List Tasks

You can list tasks using the `list` command. The following options are available to filter tasks by status:

- `-d` or `--done`: List all tasks with the status `DONE`.
- `-n` or `--not-done`: List all tasks with the statuses `TO_DO` and `IN_PROGRESS`.
- `-p` or `--in-progress`: List all tasks with the status `IN_PROGRESS`.

#### Examples:

```bash
$ task list -d
# Lists all tasks with the status DONE

$ task list -n
# Lists all tasks with the status TO_DO or IN_PROGRESS

$ task list -p
# Lists all tasks with the status IN_PROGRESS
```

### 3. Update Tasks

You can update tasks using the `upd` command. There are three options to modify a task:

- `-s` or `--status`: Update the task's status.
- `-d` or `--description`: Update the task's description.
- Both `-s` and `-d`: Update both the task's status and description.

> **Note**: You must provide the task ID when updating a task.

#### Examples:

```bash
$ task upd -s -d [id] "[new description]"
# Updates both the status and description of the task with the specified ID

$ task upd -s [id]
# Updates only the status of the task with the specified ID

$ task upd -d [id] "[new description]"
# Updates only the description of the task with the specified ID
```

### 4. Delete Tasks

You can delete tasks using the `del` command. The following options are available:

- `-a` or `--all`: Delete all tasks.
- Without any options, delete a task by its ID.

#### Examples:

```bash
$ task del -a
# Deletes all tasks

$ task del 2
# Deletes the task with ID 2
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
```

### Explicación:
1. **Encabezado:** Incluye una breve descripción del CLI.
2. **Instalación:** Instrucciones para instalar el CLI usando npm.
3. **Uso:** Se detallan todos los comandos disponibles (`add`, `list`, `upd`, `del`) junto con ejemplos claros de cómo usarlos.
4. **Licencia:** Se indica que el proyecto está bajo la licencia MIT.

Este `README.md` proporciona una guía clara para cualquier usuario que quiera instalar y utilizar el CLI, con ejemplos prácticos para cada función.