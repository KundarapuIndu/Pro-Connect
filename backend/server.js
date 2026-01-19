import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(postsRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));



const start=async()=>{
    const connectDB=await mongoose.connect("mongodb+srv://indukundarapu:segCbaS6lRWQ0OeV@cluster0.3lzpgs4.mongodb.net/linkedInCloneDB?retryWrites=true&w=majority&appName=Cluster0",{dbName: 'linkedInCloneDB'});
    app.listen(8000,()=>{
        console.log("server is running on the port 8000");
    })
}
start();