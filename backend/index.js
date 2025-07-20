import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"


const app = express();
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

// Route import
import UserRouter from "./api/routes/user.routes.js"
import BankRouter from "./api/routes/bank.routes.js"

// Route declaration
app.use("/api", UserRouter)
app.use("/api/user", BankRouter)

const PORT = process.env.PORT || 8000;

// Connect DB then start server
const connectDBAndStartServer = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected")
        app.listen(PORT, () => {
            console.log("Hello PORT: "+PORT)
        })    
    } catch (error) {
        console.log(error)
    }
}
connectDBAndStartServer();

app.get("/", (req, res) => {
    res.send("Hello PORT: "+PORT)
})