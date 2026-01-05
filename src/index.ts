import express, { Application, Request, Response } from 'express';
import cors from "cors";
import dotenv from "dotenv";
// Load environtment variable
dotenv.config();
const PORT: string = process.env.PORT || "5555";

// initialize express API Server
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("<h1>ORM API Running</h1>")
});

// Start Server
app.listen(PORT, () => {
    console.log(`API RUNNING at http://localhost:${PORT}`);
});

