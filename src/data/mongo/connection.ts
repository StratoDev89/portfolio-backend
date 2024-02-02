import mongoose from "mongoose";

interface ConnectionOptions {
  mongoURL: string;
  dbName: string;
}

export class MongoConnection {
  static async connect(options: ConnectionOptions) {
    const { mongoURL, dbName } = options;

    try {
      await mongoose.connect(mongoURL, { dbName });
      console.log("Mongo connection");

      return true;
    } catch (error) {
      console.log("Mongo connection error");
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
