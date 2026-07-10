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
// Put Task
const putTaskForm = document.querySelector("#put-task-form");
const putTaskId = document.querySelector("#put-task-id");
const putTaskTitle = document.querySelector("#put-task-title");
const putTaskCourse = document.querySelector("#put-task-course");
const putTaskCompleted = document.querySelector("#put-task-completed");
// Patch
const patchTaskForm = document.querySelector("#patch-task-form");
const patchTaskId = document.querySelector("#patch-task-id");
const patchTaskTitle = document.querySelector("#patch-task-title");
const patchTaskCourse = document.querySelector("#patch-task-course");
const patchTaskCompleted = document.querySelector("#patch-task-completed");
// Delete Task
const deleteTaskForm = document.querySelector("#delete-task-form");
const deleteTaskId = document.querySelector("#delete-task-id");

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
// Put Task
const putTaskText = document.querySelector("#put-status");
// Patch Task
const patchTaskText = document.querySelector("#patch-status");
// Delete Task
const deleteTaskText = document.querySelector("#delete-status");

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

    if (id < 1) {
        getTaskText.textContent = `Please select an id number greater than 0`;
        return;
    }

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
            throw new Error(`POST /api/tasks failed with status ${response.status}`);
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
// Put Task
async function putTask(event) {
    event.preventDefault();

    const id = Number(putTaskId.value);
    const title = putTaskTitle.value.trim();
    const course = putTaskCourse.value.trim();
    const completed = putTaskCompleted.value.trim().toLowerCase();
    const completedValidity = completed === "false" || completed === "true";

    if (!title || !course || !completedValidity || id < 1) {
        putTaskText.textContent = `Invalid Task or ID Submitted`;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, course, completed })
        })

        if (response.status === 400) {
            postTaskText.textContent = `Server Rejected Data: Bad Request`;
        } else if (response.status === 404) {
            postTaskText.textContent = `Server Rejected Data: Original Item not Found`;
        } else if (!response.ok) {
            throw new Error(`PUT /api/tasks failed with status ${response.status}`);
        } else {
            const data = await response.json();
            const task = data.task;
            putTaskText.textContent = `Overwrote task ${task.id} to the following => ${task.id}: ${task.title} (${task.course}) ${Boolean(task.completed) ? completedString : notCompletedString}`;
        }

    } catch (error) {
        putTaskText.textContent = `Error Overwriting Task ${id}: ${error.message}`;
    }
}
putTaskForm.addEventListener("submit", async (event) => { putTask(event) });
// Patch Task
async function patchTask(event) {
    event.preventDefault();

    const id = Number(patchTaskId.value);
    const title = patchTaskTitle.value.trim();
    const course = patchTaskCourse.value.trim();
    const completed = patchTaskCompleted.value.trim().toLowerCase();
    const completedValidity = completed === "false" || completed === "true";

    if (id < 1) {
        patchTaskText.textContent = `Invalid ID Submitted`;
        return;
    }

    console.log(`${id} ${title} ${course} ${completed} `);

    const clickedButton = event.submitter;

    var response;

    try {
        if (clickedButton.value === "title") {
            if (!title) {
                patchTaskText.textContent = `Invalid title Submitted`;
                return;
            }
            response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            })
        } else if (clickedButton.value === "course") {
            if (!course) {
                patchTaskText.textContent = `Invalid course Submitted`;
                return;
            }
            response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ course })
            })
        } else if (clickedButton.value === "completed") {
            if (!completedValidity) {
                patchTaskText.textContent = `Invalid completion state Submitted`;
                return;
            }
            response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed })
            })
        }
        const data = await response.json();
        const task = data.task;

        if (response.status === 400) {
            patchTaskText.textContent = `Server Rejected Data: Bad Request`;
        } else if (response.status === 404) {
            patchTaskText.textContent = `Server Rejected Data: Original Item not Found`;
        } else if (!response.ok) {
            throw new Error(`PUT /api/tasks failed with status ${response.status}`);
        } else {
            const data = await response.json();
            const task = data.task;
            patchTaskText.textContent = `Edited task ${task.id} to the following => ${task.id}: ${task.title} (${task.course}) ${Boolean(task.completed) ? completedString : notCompletedString}`;
        }

    } catch (error) {
        patchTaskText.textContent = `Error Editing Task ${id}: ${error.message}`;
    }

}
patchTaskForm.addEventListener("submit", async (event) => { patchTask(event) });
// Delete Task
async function deleteTask(event) {
    event.preventDefault();

    const id = Number(deleteTaskId.value);

    if (id < 1) {
        deleteTaskText.textContent = `Please select an id number greater than 0`;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, { method: "DELETE" });
        if (response.status === 404) {
            deleteTaskText.textContent = `Task ${id} not found`;
        } else if (!response.ok) {
            throw new Error(`DELETE /api/tasks failed with status ${response.status}`);
        } else {
            deleteTaskText.textContent = `Successfully deleted task ${id}`;
        }

    } catch (error) {
        deleteTaskText.textContent = `Error Deleting Task ${id}: ${error.message}`;
    }

}
deleteTaskForm.addEventListener("submit", async (event) => { deleteTask(event) });




