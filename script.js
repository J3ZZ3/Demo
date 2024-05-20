document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Task cannot be empty');
        return;
    }

    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    saveTasksToLocalStorage(tasks);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const newTask = prompt('Edit your task:', tasks[index]);

    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}
