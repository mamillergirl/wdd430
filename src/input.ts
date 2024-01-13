class TaskList {
    list: Task[];

    constructor() {
        this.list = JSON.parse(localStorage.getItem('tasks')) || [];
        this.renderTasks();
    }

    addTask(taskText: string) {
        if (taskText.trim() !== '') {
            const task = new Task(taskText);
            this.list.push(task);
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    toggleTaskComplete(index: number) {
        if (index >= 0 && index < this.list.length) {
            this.list[index].toggleComplete();
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    emptyComplete(){
        this.list = this.list.filter(task => !task.complete);
        this.saveToLocalStorage();
        this.renderTasks();
    }
    clearList(){
        this.list = [];
        this.saveToLocalStorage();
        this.renderTasks();
    }
    
    private renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks
        this.list.forEach((task, index) => {
            const newTask = document.createElement('li');
            newTask.textContent = task.taskContent;
            updateTaskClass(newTask, task.complete);
            newTask.addEventListener('dblclick', () => this.toggleTaskComplete(index));
            taskList.appendChild(newTask);
        });
    }

    private saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.list));
    }
}

class Task {
    taskContent: string;
    complete: boolean;

    constructor(task: string) {
        this.taskContent = task;
        this.complete = false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

var taskInput: HTMLInputElement = document.getElementById('taskInput') as HTMLInputElement;
var addTaskBtn: HTMLButtonElement = document.getElementById('addTaskBtn') as HTMLButtonElement;
var taskList: HTMLOListElement = document.getElementById('taskList') as HTMLOListElement;
var clearEmptyBtn: HTMLButtonElement = document.getElementById('clearEmptyBtn') as HTMLButtonElement;
var clearListBtn: HTMLButtonElement = document.getElementById('clearListBtn') as HTMLButtonElement;

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

clearListBtn.addEventListener('click', function(){
    taskListInstance.clearList
})

function updateTaskClass(taskElement: HTMLElement, isComplete: boolean) {
    if (isComplete) {
        taskElement.classList.add('line-through');
    } else {
        taskElement.classList.remove('line-through');
    }
}
