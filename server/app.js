import express from 'express';
import cors from 'cors';
const app = express();

import authRoute from "./route/authRoute.js";
import taskRoute from "./route/taskRoute.js";
import { connectDB } from './db/db.js';
import dotenv from "dotenv";

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);



export default app;