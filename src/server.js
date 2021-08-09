import express from "express";
import morgan from "morgan"
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRounter from "./routers/userRouter";

const PORT = 4000

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("/users", userRounter);
app.use("/videos", videoRouter);


const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);