import express from "express";
import { edit, see, deleteVideo, upload } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/delet", deleteVideo);
videoRouter.get("/:id(\\d+)/edit", edit);

export default videoRouter;