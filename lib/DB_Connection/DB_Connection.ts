import mongoose from "mongoose";

let isConnected = false; // Global connection status


export const DBConnection = async (): Promise<void> => {
    if (isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    const existingConnection = mongoose.connections.find((conn) => conn.readyState === 1);
    if (existingConnection) {
        console.log("Using existing database connection.");
        isConnected = true;
        return;
    }

    const mongoUri = process.env.MONGODB_URI!;
    if (!mongoUri) {
        throw new Error("MongoDB URI is not defined in environment variables.");
    }

    try {
        const db = await mongoose.connect(mongoUri);
        isConnected = db.connections[0].readyState === 1;
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Failed to connect to the database.");
    }
};
