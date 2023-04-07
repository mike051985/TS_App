// Defife the class TodoList to represent the list of todos
var TodoList = /** @class */ (function () {
    function TodoList() {
        var storedTodos = localStorage.getItem('todos');
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    }
    TodoList.prototype.getTasks = function () {
        return this.todos;
    };
    TodoList.prototype.addTask = function (task) {
        this.todos.push({
            task: task,
            completed: false,
        });
        this.saveTasks();
    };
    TodoList.prototype.toggleTask = function (index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTasks();
    };
    TodoList.prototype.deleteTask = function (index) {
        this.todos.splice(index, 1);
        this.saveTasks();
    };
    TodoList.prototype.saveTasks = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    return TodoList;
}());
// Get the task input and task list elements
var form = document.querySelector('form');
var input = form.querySelector('input');
var todoList = new TodoList();
var list = document.getElementById('todo-list');
// Define a function to render the task list
function render() {
    list.innerHTML = '';
    var tasks = todoList.getTasks();
    var _loop_1 = function (i) {
        var task = tasks[i];
        var li = document.createElement('li');
        // Add a checkbox to check if the task is completed
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            todoList.toggleTask(i);
            render();
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.task));
        // Add a button to delete the task
        var button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', function () {
            todoList.deleteTask(i);
            render();
        });
        li.appendChild(button);
        list.appendChild(li);
    };
    for (var i = 0; i < tasks.length; i++) {
        _loop_1(i);
    }
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var task = input.value.trim();
    if (task) {
        todoList.addTask(task);
        input.value = '';
        render();
    }
});
render();
