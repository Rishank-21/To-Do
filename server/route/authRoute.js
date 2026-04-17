import express from "express";
import { getUser, login, register } from "../controller/authController.js";
import { isAuth } from "../middleware/isAuth.js";
const router  = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/get-me",isAuth, getUser);


export default router;