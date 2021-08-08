import express from "express";
import { edit, remove, see, logout } from "../controllers/userController";

const userRounter = express.Router();


userRounter.get("/logout", logout);
userRounter.get("/edit", edit);
userRounter.get("/remove", remove);
userRounter.get("/:id(\\d+)", see);

export default userRounter;