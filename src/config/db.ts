import mongoose from "mongoose";
import { serverConfig } from ".";

export async  function connectDB(){
    try {
        await mongoose.connect(serverConfig.MONGO_URI)
        console.log("connected to database")
    } catch (error) {
        console.log("error connecting to mongodb",error)
        throw error
    }
} 