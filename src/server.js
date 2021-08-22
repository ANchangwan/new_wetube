import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRounter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(session(
    {secret:"hello",
    resave:true,
    saveUninitialized:true,
}
));

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRounter);
app.use("/videos", videoRouter);


export default app;


