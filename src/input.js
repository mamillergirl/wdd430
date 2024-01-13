var TaskList = /** @class */ (function () {
    function TaskList() {
        this.list = JSON.parse(localStorage.getItem('tasks')) || [];
        this.renderTasks();
    }
    TaskList.prototype.addTask = function (taskText) {
        if (taskText.trim() !== '') {
            var task = new Task(taskText);
            this.list.push(task);
            this.saveToLocalStorage();
            this.renderTasks();
        }
    };
    TaskList.prototype.toggleTaskComplete = function (index) {
        if (index >= 0 && index < this.list.length) {
            this.list[index].toggleComplete();
            this.saveToLocalStorage();
            this.renderTasks();
        }
    };
    TaskList.prototype.emptyComplete = function () {
        this.list = this.list.filter(function (task) { return !task.complete; });
        this.saveToLocalStorage();
        this.renderTasks();
    };
    TaskList.prototype.clearList = function () {
        this.list = [];
        this.saveToLocalStorage();
        this.renderTasks();
    };
    TaskList.prototype.renderTasks = function () {
        var _this = this;
        taskList.innerHTML = ''; // Clear existing tasks
        this.list.forEach(function (task, index) {
            var newTask = document.createElement('li');
            newTask.textContent = task.taskContent;
            updateTaskClass(newTask, task.complete);
            newTask.addEventListener('dblclick', function () { return _this.toggleTaskComplete(index); });
            taskList.appendChild(newTask);
        });
    };
    TaskList.prototype.saveToLocalStorage = function () {
        localStorage.setItem('tasks', JSON.stringify(this.list));
    };
    return TaskList;
}());
var Task = /** @class */ (function () {
    function Task(task) {
        this.taskContent = task;
        this.complete = false;
    }
    Task.prototype.toggleComplete = function () {
        this.complete = !this.complete;
    };
    return Task;
}());
var taskInput = document.getElementById('taskInput');
var addTaskBtn = document.getElementById('addTaskBtn');
var taskList = document.getElementById('taskList');
var clearEmptyBtn = document.getElementById('clearEmptyBtn');
var clearListBtn = document.getElementById('clearListBtn');
var taskListInstance = new TaskList();
clearListBtn.addEventListener('click', function () {
    taskListInstance.clearList();
});
addTaskBtn.addEventListener('click', function () {
    taskListInstance.addTask(taskInput.value.trim());
    taskInput.value = '';
});
clearEmptyBtn.addEventListener('click', function () {
    taskListInstance.emptyComplete();
});
clearListBtn.addEventListener('click', function () {
    taskListInstance.clearList;
});
function updateTaskClass(taskElement, isComplete) {
    if (isComplete) {
        taskElement.classList.add('line-through');
    }
    else {
        taskElement.classList.remove('line-through');
    }
}
