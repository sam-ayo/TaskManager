const express = require("express");
const dotenv = require("dotenv");
const tasks = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
const notFound = require("./middleware/not-found.js");
const errorHandler = require("./middleware/error.js");

const app = express();
const PORT = 3000||process.env.PORT
dotenv.config()


// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks",tasks);
app.use(notFound);
app.use(errorHandler);

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {console.log(`Listening on port ${PORT}`)})
    } catch (error) {
        console.log(error);
    }
}

start();
