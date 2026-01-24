import mongoose from "mongoose";

const defaultOpts = {
  autoIndex: true,
  // Fail fast if host unreachable
  serverSelectionTimeoutMS: 5000,
  // recommended
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let cached = global.__mongoose;

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI is missing");

  if (cached && cached.conn) {
    return cached.conn;
  }

  if (!cached) {
    cached = global.__mongoose = { conn: null, promise: null };
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(uri, defaultOpts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected");
  return cached.conn;
}