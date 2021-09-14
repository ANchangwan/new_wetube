import express from "express";
import { getEdit,
         postEdit, 
         see, 
         logout,
         startGithubLogin,
         finishGithub, 
         getChangePassword,
         postChangePassword
        } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRounter = express.Router();


userRounter.get("/logout", protectorMiddleware,logout);
userRounter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"),postEdit);
userRounter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRounter.get("/github/start", publicOnlyMiddleware,startGithubLogin);
userRounter.get("/github/finish", publicOnlyMiddleware,finishGithub);

userRounter.get("/:id", see);


export default userRounter;