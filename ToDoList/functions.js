let tasks = [];

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task').value;

    if (taskInput) {
        // Adiciona a nova tarefa
        const newTask = {
            id: Date.now(),
            content: taskInput,
            completed: false
        };
        tasks.push(newTask);
        document.getElementById('new-task').value = '';

        // Atualiza a interface
        displayTasks(tasks);
        updateTaskCount();
    }
});

function displayTasks(taskList) {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';

    taskList.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('change', function() {
            task.completed = this.checked;
            updateTaskCount();
        });

        const taskContent = document.createElement('span');
        taskContent.innerText = task.content;

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskContent);

        taskListContainer.appendChild(taskItem);
    });
}

function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('task-count').innerText = `Total: ${completedTasks} de ${totalTasks} concluídos`;
}

// Filtros de tarefas
document.getElementById('all-tasks').addEventListener('click', function() {
    setActiveFilter(this);
    displayTasks(tasks);
});

document.getElementById('incomplete-tasks').addEventListener('click', function() {
    setActiveFilter(this);
    const incompleteTasks = tasks.filter(task => !task.completed);
    displayTasks(incompleteTasks);
});

document.getElementById('complete-tasks').addEventListener('click', function() {
    setActiveFilter(this);
    const completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
});

function setActiveFilter(button) {
    document.querySelectorAll('.filter').forEach(filter => filter.classList.remove('active'));
    button.classList.add('active');
}
