import mongoose from "mongoose";

type ConnectionObject = {
    isConnected: number;
    };

    const connection: ConnectionObject = {
    isConnected: 0,
    };

    async function dbConnect() : Promise<void> {
        if (connection.isConnected) {
            console.log("MongoDB is already connected.");
            return;
        }

        try {
            await mongoose.connect(process.env.MONGODB_URI as string);
            connection.isConnected = 1;
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    }
export default dbConnect