const API_BASE_URL = "http://localhost:3000";

/*
    CONSTANTS
*/
let completedString = "is completed"
let notCompletedString = "is not completed"

/* 
    INPUT
*/
// Get Health
const getHealthButton = document.querySelector("#get-health");
// Get Tasks
const getTasksButton = document.querySelector("#get-tasks");
// Get Task
const getTaskForm = document.querySelector("#get-task-form");
const getTaskId = document.querySelector("#get-task-id");
// Post Task
const postTaskForm = document.querySelector("#post-task-form");
const postTaskTitle = document.querySelector("#post-task-title");
const postTaskCourse = document.querySelector("#post-task-course");
const postTaskCompleted = document.querySelector("#post-task-completed");

/*
    OUTPUT
*/
// Get Health
const healthText = document.querySelector("#health");
// Get Tasks
const getTasksList = document.querySelector("#tasks");
// Get Task
const getTaskText = document.querySelector("#task");
// Post Task
const postTaskText = document.querySelector("#post-status");

/*
    FUNCTIONS
*/
// Get Health
async function getHealth() {
    try {
        healthText.textContent = `Getting Status`;
        const response = await fetch(`${API_BASE_URL}/health`);

        if (!response.ok) {
            throw new Error(`GET /api/tasks failed with status ${response.status}`);
        }

        healthText.textContent = `API is up`;

    } catch (error) {
        healthText.textContent = `API is down`;
    }
}
getHealthButton.addEventListener("click", getHealth);
// Get Tasks
async function getTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`);

        if (!response.ok) {
            throw new Error(`GET /api/tasks failed with status ${response.status}`);
        }

        const data = await response.json();

        getTasksList.replaceChildren();
        for (const task of data.tasks) {
            const li = document.createElement("li");
            li.textContent = `${task.id}: ${task.title} (${task.course}) ${Boolean(task.completed) ? completedString : notCompletedString}`;
            getTasksList.appendChild(li);
        }

    } catch (error) {
        getTasksList.replaceChildren();
        const li = document.createElement("li");
        li.textContent = `Error Retrieving Tasks: ${error.message}`
        getTasksList.appendChild(li);
    }
}
getTasksButton.addEventListener("click", getTasks);
// Get Task
async function getTask(event) {
    event.preventDefault();

    const id = Number(getTaskId.value);
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
        if (response.status === 404) {
            getTaskText.textContent = `Task ${id} not found`;
        } else if (!response.ok) {
            throw new Error(`GET /api/tasks failed with status ${response.status}`);
        } else {
            const data = await response.json();
            const task = data.task;
            getTaskText.textContent = `${task.id}: ${task.title} (${task.course}) ${Boolean(task.completed) ? completedString : notCompletedString}`;
        }
        
    } catch (error) {
        getTaskText.textContent = `Error Retrieving Task ${id}: ${error.message}`;
    }

}
getTaskForm.addEventListener("submit", async (event) => { getTask(event) });
// Post Task
async function postTask(event) {
    event.preventDefault();

    const title = postTaskTitle.value.trim();
    const course = postTaskCourse.value.trim();
    const completed = postTaskCompleted.value.trim().toLowerCase();
    const completedValidity = completed === "false" || completed === "true";

    if (!title || !course || !completedValidity) {
        postTaskText.textContent = `Invalid Task Submitted`;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, course, completed })
        })

        if (response.status === 400) {
            postTaskText.textContent = `Server Rejected Data: Bad Request`;
        } else if (!response.ok) {
            throw new Error(`GET /api/tasks failed with status ${response.status}`);
        } else {
            const data = await response.json();
            const task = data.task;
            postTaskText.textContent = `Made the following task => ${task.id}: ${task.title} (${task.course}) ${Boolean(task.completed) ? completedString : notCompletedString}`;
        }

    } catch (error) {
        postTaskText.textContent = `Error Creating Task ${id}: ${error.message}`;
    }


}
postTaskForm.addEventListener("submit", async (event) => { postTask(event) });


