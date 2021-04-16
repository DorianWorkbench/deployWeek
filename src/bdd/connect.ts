import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
export const mongod = new MongoMemoryServer();

export async function connect() {
  if (process.env.NODE_ENV === "test") {
    try {
      const uri = await mongod.getUri();
      return await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    } catch (err: any) {
      console.log(err);
    }
  } else {
    return await mongoose.connect(process.env.DB_TEST!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
}
