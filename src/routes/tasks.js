
let nextId = 3;
let tasks = [
    { id: 1, title: "Midterm", course: "cs-559", completed: false },
    { id: 2, title: "Lab 5", course: "cs-559", completed: false }
];

export function getTasks(req, res) {
    res.status(200).json({ tasks })
}

export function getTask(req, res) {
    const id = Number(req.params.id);
    var found = false;
    var selectedTask;

    for (const task of tasks) {
        if (task.id === id) {
            selectedTask = task;
            found = true;
            break;
        }
    }

    if (found) {
        res.status(200).json({ task: selectedTask });
    } else {
        res.status(404).json({ error: "Not found" });
    }
}

export function postTask(req, res) {
    const title = req.body?.title?.trim();
    const course = req.body?.course?.trim();
    const completedText = req.body?.completed?.trim().toLowerCase();
    const completedValidity = completedText === "true" || completedText === "false";
    const completed = (completedText === "true") ? true : false;

    if (title && course && completedValidity) { // passes validity
        const id = nextId;
        nextId++;
        const task = { id: id, title: title, course: course, completed: completed }
        tasks.push(task);
        res.status(201).json({ task: task });
    } else { // fails validity
        res.status(400).json({
            error: "Bad Request",
            message: "A title, course, and completed status is required."
        });
    }
}

export function putTask(req, res) {
    res.status(501).json({ error: "Put Task not implemented yet" });
}

export function patchTask(req, res) {
    res.status(501).json({ error: "Patch Task not implemented yet" });
}

export function deleteTask(req, res) {
    res.status(501).json({ error: "Delete Task not implemented yet" });
}