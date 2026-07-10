
let nextId = 3;
let tasks = [
    { id: 1, title: "Midterm", course: "cs-553", completed: false },
    { id: 2, title: "Lab 5", course: "cs-553", completed: false }
];

function findTask(id) {
    for (const task of tasks) {
        if (task.id === id) { return task; }
    }
    return null;
}

export function getTasks(req, res) {
    res.status(200).json({ tasks })
}

export function getTask(req, res) {
    const id = Number(req.params.id);
    var task = findTask(id);

    if (task) {
        res.status(200).json({ task: task });
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
    const id = Number(req.params.id);
    const title = req.body?.title?.trim();
    const course = req.body?.course?.trim();
    const completedText = req.body?.completed?.trim().toLowerCase();
    const completedValidity = completedText === "true" || completedText === "false";
    const completed = (completedText === "true") ? true : false;

    if (title && course && completedValidity) { // passes validity

        const task = findTask(id);

        if (task) {
            task.title = title;
            task.course = course;
            task.completed = completed;
            res.status(200).json({ task: task });
        } else {
            res.status(404).json({ error: "Not found" });
        }
    } else { // fails validity
        res.status(400).json({
            error: "Bad Request",
            message: "A title, course, and completed status is required."
        });
    }
}

export function patchTask(req, res) {
    const id = Number(req.params.id);
    const title = req.body?.title?.trim();
    const course = req.body?.course?.trim();
    const completedText = req.body?.completed?.trim().toLowerCase();
    const completedValidity = completedText === "true" || completedText === "false";
    const completed = (completedText === "true") ? true : false;

    const task = findTask(id);

    var changeMade = false;

    if (task) {
        if (title) {
            task.title = title;
            changeMade = true;
        }

        if (course) {
            task.course = course;
            changeMade = true;
        }

        if (completedValidity) {
            task.completed = completed;
            changeMade = true;
        }

        if (changeMade) {
            res.status(200).json({ task: task });
        } else {
            res.status(400).json({ error: "No valid changes found in the request" });
        }
    } else {
        res.status(404).json({ error: "Not found" });
    }
}

export function deleteTask(req, res) {
    const id = Number(req.params.id);
    const task = findTask(id);
    if (task) {
        const idx = tasks.indexOf(task);
        tasks.splice(idx, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: "Not found" });
    }
}