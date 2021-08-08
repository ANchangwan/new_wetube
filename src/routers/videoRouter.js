import express from "express";
import { edit, see, deleteVideo, upload } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/:id", see);
videoRouter.get("/:id/delet", deleteVideo);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/upload", upload);

export default videoRouter;