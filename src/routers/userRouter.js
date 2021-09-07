import express from "express";
import { getEdit,
         postEdit, 
         remove, 
         see, 
         logout,
         startGithubLogin,
         finishGithub 
        } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRounter = express.Router();


userRounter.get("/logout", protectorMiddleware,logout);
userRounter.route("/edit-profile").all(protectorMiddleware).get(getEdit).post(postEdit);
userRounter.get("/remove", remove);
userRounter.get("/github/start", publicOnlyMiddleware,startGithubLogin);
userRounter.get("/github/finish", publicOnlyMiddleware,finishGithub);
userRounter.get("/:id(\\d+)", see);


export default userRounter;