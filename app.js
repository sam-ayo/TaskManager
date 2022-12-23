const express = require("express");
const dotenv = require("dotenv");
const tasks = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");

const app = express();
const PORT = 3000||process.env.PORT
dotenv.config()

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {console.log(`Listening on port ${PORT}`)})
    } catch (error) {
        console.log(error);
    }
}

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks",tasks);

start();
