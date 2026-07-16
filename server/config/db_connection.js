import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/hr-erp-10d");
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
}

export default connectDB;