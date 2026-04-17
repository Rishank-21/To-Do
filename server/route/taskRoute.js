import express from "express";
import { createTask, getTasks, updateStatus, updateTask, deleteTask } from "../controller/taskController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// Create a new task
router.post("/create", isAuth, createTask);

// Get all tasks (with optional status filter: ?status=pending or ?status=completed)
router.get("/all", isAuth, getTasks);

// Update task status (mark as completed/pending)
router.put("/status/:taskId", isAuth, updateStatus);

// Edit task details (title and/or description)
router.put("/edit/:taskId", isAuth, updateTask);

// Delete a task
router.delete("/delete/:taskId", isAuth, deleteTask);

export default router;
