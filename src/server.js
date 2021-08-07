import express from "express";
import morgan from "morgan"

const PORT = 4000

const app = express();

const globalRouter = express.Router();
const userRounter = express.Router();
const videoRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const handleEditUser = (req, res) => res.send("Edit User");
userRounter.get("/edit", handleEditUser);

const handleWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("/users", userRounter);
app.use("/videos", videoRouter);


const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);