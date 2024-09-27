import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB(): Promise<Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGO_URL as string);

    cachedConnection = cnx.connection;

    return cachedConnection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

