const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
let tasks = {};

days.forEach(day => {
    tasks[day] = JSON.parse(localStorage.getItem(day)) || [];
    renderTasks(day);
});

const dateDisplay = document.getElementById('dateDisplay');
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateDisplay.textContent = today.toLocaleDateString('en-US', options);

document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const day = button.getAttribute('data-day');
        const input = document.getElementById(`${day}-input`);
        const taskText = input.value.trim();

        if (taskText) {
            tasks[day].push({ text: taskText, completed: false });
            localStorage.setItem(day, JSON.stringify(tasks[day]));
            renderTasks(day);
            input.value = '';
        }
    });
});

function renderTasks(day) {
    const taskContainer = document.getElementById(`${day}-tasks`);
    const totalTasks = document.getElementById(`${day}-total`);
    const completedTasks = document.getElementById(`${day}-completed`);

    taskContainer.innerHTML = tasks[day].map((task, index) => `
        <div class="task ${task.completed ? 'completed' : ''}">
            <span>${task.text}</span>
            <div>
                <button onclick="toggleCompleted('${day}', ${index})"><i class="fas fa-check"></i></button>
                <button onclick="deleteTask('${day}', ${index})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    totalTasks.textContent = tasks[day].length;
    completedTasks.textContent = tasks[day].filter(task => task.completed).length;
}

function toggleCompleted(day, index) {
    tasks[day][index].completed = !tasks[day][index].completed;
    localStorage.setItem(day, JSON.stringify(tasks[day]));
    renderTasks(day);
}

function deleteTask(day, index) {
    tasks[day].splice(index, 1);
    localStorage.setItem(day, JSON.stringify(tasks[day]));
    renderTasks(day);
}