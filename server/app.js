import express from 'express';
import cors from 'cors';
const app = express();

import authRoute from "./route/authRoute.js";
import taskRoute from "./route/taskRoute.js";
import { connectDB } from './db/db.js';
import dotenv from "dotenv";

dotenv.config();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB();


app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);



export default app;
