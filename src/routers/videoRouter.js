import express from "express";
import { edit, deleteVideo, upload, watch } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/delet", deleteVideo);
videoRouter.get("/:id(\\d+)/edit", edit);

export default videoRouter;