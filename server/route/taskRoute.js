import express from "express";
import { createTask, getTasks, updateStatus, updateTask, deleteTask } from "../controller/taskController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();


router.post("/create", isAuth, createTask);


router.get("/all", isAuth, getTasks);


router.put("/status/:taskId", isAuth, updateStatus);


router.put("/edit/:taskId", isAuth, updateTask);


router.delete("/delete/:taskId", isAuth, deleteTask);

export default router;
