import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongodbconnectionstring = process.env.MONGODBCONNECTIONSTRING;
const connectionDB=async()=>{
    try {
      console.log("connection string is",mongodbconnectionstring);  
      const connection=await mongoose.connect(mongodbconnectionstring)
      console.log("connected DB");
      return connection
    } catch (error) {
        console.log("error",error);
    }
}
export default connectionDB