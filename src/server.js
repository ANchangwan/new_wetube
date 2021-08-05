import express from "express";

const PORT = 4000

const app = express();

const gossipMiddelware = (req, res, next) =>{
    console.log("i'm in the middleware!");
    next();
}
const handleHome = (req, res) => res.end("this is my server");
const handleLogin = (req, res) => res.send("Login Here");

app.get("/",gossipMiddelware, handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);