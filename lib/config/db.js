import mongoose from "mongoose";

let cachedConnection = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGO_URL);

    cachedConnection = cnx.connection;

    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/*


    const cnx = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });


    */
