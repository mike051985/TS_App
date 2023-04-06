interface Todo {
    task: string;
    completed: boolean;
    }

class TodoList {
    private todos: Todo[];

    constructor() {
        const storedTodos = localStorage.getItem('todos');
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    }

    getTasks(): Todo[] {
        return this.todos;
    }

    addTask(task: string): void {
        this.todos.push({
        task,
        completed: false,
        });
        this.saveTasks();
    }

    toggleTask(index: number): void {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTasks();
    }

    deleteTask(index: number): void {
        this.todos.splice(index, 1);
        this.saveTasks();
    }

    private saveTasks(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

const form = document.querySelector('form') as HTMLFormElement;
const input = form.querySelector('input') as HTMLInputElement;
const todoList = new TodoList();
const list = document.getElementById('todo-list') as HTMLUListElement;

function render(): void {
    list.innerHTML = '';
    const tasks = todoList.getTasks();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            todoList.toggleTask(i);
            render();
        });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.task));
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        todoList.deleteTask(i);
        render();
        });
        li.appendChild(button);
        list.appendChild(li);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = input.value.trim();
    if (task) {
        todoList.addTask(task);
        input.value = '';
        render();
    }
});

render();