import express from "express";
import { edit, remove } from "../controllers/userController";

const userRounter = express.Router();



userRounter.get("/edit", edit);
userRounter.get("/remove", remove);

export default userRounter;