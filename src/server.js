import express from "express";
import cors from "cors";

import { getHealth } from "./routes/health.js";
import { getTask, getTasks, postTask, putTask, patchTask, deleteTask } from "./routes/tasks.js";
import { timestampRequest, logRequest } from "./middleware/logger.js"
import { validateRequest } from "./middleware/errorHandler.js"


export function createApp() {
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ]
    }));

    app.use((req, res, next) => { timestampRequest(req, res); next(); });
    app.use((req, res, next) => { validateRequest(req, res); next(); });

    app.get("/health", async (req, res, next) => { getHealth(req, res); next(); });
    app.get("/api/tasks", async (req, res, next) => { getTasks(req, res); next(); });
    app.get("/api/tasks/:id", async (req, res, next) => { getTask(req, res); next(); });
    app.post("/api/tasks", async (req, res, next) => { postTask(req, res); next(); });
    app.put("/api/tasks/:id", async (req, res, next) => { putTask(req, res); next(); });
    app.patch("/api/tasks/:id", async (req, res, next) => { patchTask(req, res); next(); });
    app.delete("/api/tasks/:id", async (req, res, next) => { deleteTask(req, res); next(); });

    app.use((req, res, next) => { logRequest(req, res); next(); });

    return app;
}

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
    console.log(`Midterm 'Tasks' listening on port ${PORT}`);
});