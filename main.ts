
// Define the Todo interface
interface Todo {
    task: string;
    completed: boolean;
    }

    // Defife the class TodoList to represent the list of todos
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

// Get the task input and task list elements
const form = document.querySelector('form') as HTMLFormElement;
const input = form.querySelector('input') as HTMLInputElement;
const todoList = new TodoList();
const list = document.getElementById('todo-list') as HTMLUListElement;

// Define a function to render the task list
function render(): void {
    list.innerHTML = '';
    const tasks = todoList.getTasks();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        // Add a checkbox to check if the task is completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            todoList.toggleTask(i);
            render();
        });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.task));
    // Add a button to delete the task
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

//Add an event listener to the form
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


 