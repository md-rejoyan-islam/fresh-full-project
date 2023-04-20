import mongoose from "mongoose";


const mongoDBConnection=async()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongoDB is connected to ${connect.connection.host}`);
    } catch (error) {
        console.log(`${error.message}`.bgRed);
    }
}  

export default mongoDBConnection 