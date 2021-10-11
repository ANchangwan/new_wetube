import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";
import app from "./server";


const PORT = 4000;

const handleListening = () => console.log(`start nodejs on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);