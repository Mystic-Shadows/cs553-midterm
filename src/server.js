import express from "express";
import cors from "cors";

import { getHealth } from "./routes/health.js";

export function createApp() {
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ]
    }));

    app.get("/health", async (req, res) => { getHealth(req, res) });

    return app;
}

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
    console.log(`Midterm 'Tasks' listening on port ${PORT}`);
});