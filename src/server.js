import express from "express";

const PORT = 4000

const app = express();

const  logger = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) =>{
    const url = req.url;
    if(url === "/protect"){
        return res.send("<h1>not Allowed</h1>");
    }
    console.log("Allowed, you may continue.");
    next();
}

const handleHome = (req, res) => res.end("this is my server");
const handleProtected = (req, res) => {
    return res.send("this is my private lounge.");
}



app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);