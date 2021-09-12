import express from "express";
import { getEdit,
         postEdit, 
         remove, 
         see, 
         logout,
         startGithubLogin,
         finishGithub, 
         getChangePassword,
         postChangePassword
        } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRounter = express.Router();


userRounter.get("/logout", protectorMiddleware,logout);
userRounter.route("/edit-profile").all(protectorMiddleware).get(getEdit).post(postEdit);
userRounter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRounter.get("/github/start", publicOnlyMiddleware,startGithubLogin);
userRounter.get("/github/finish", publicOnlyMiddleware,finishGithub);

userRounter.get("/:id(\\d+)", see);


export default userRounter;