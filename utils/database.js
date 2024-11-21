import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already conencted')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt"
        })

        isConnected = true;
    } catch (err) {
        console.log(err)
    }
}