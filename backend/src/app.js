import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors("*"));
app.use(express.json({ limit: "2mb" })); // adjust if you store base64 avatars
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({
    message: "Server is running successfully",
    status: "OK",
    timestamp: new Date().toISOString(),
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes); // includes /profiles and /u/:handle
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
