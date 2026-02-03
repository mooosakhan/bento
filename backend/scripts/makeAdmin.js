import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = process.argv[2];

    if (!email) {
      console.error("Usage: node scripts/makeAdmin.js <user-email>");
      process.exit(1);
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.error(`User with email "${email}" not found`);
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`User "${email}" is already an admin`);
      process.exit(0);
    }

    user.role = "admin";
    await user.save();

    console.log(`✓ User "${email}" (${user.name}) is now an admin`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

makeAdmin();
