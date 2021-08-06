import express from "express";
import morgan from "morgan"

const PORT = 4000

const app = express();





const handleHome = (req, res) => res.end("this is my server");
const handleProtected = (req, res) => {
    return res.send("this is my private lounge.");
}


app.use(morgan("dev"));
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);