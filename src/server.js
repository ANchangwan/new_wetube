import express from "express";

const PORT = 4000

const app = express();

const handleHome = (req, res) => res.end("this is my server");
const handleLogin = (req, res) => res.send("Login Here");

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);