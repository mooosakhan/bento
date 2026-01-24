import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import dbConnect from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`✅ API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
