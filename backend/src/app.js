import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors("*"));
app.use(express.json({ limit: "2mb" })); // adjust if you store base64 avatars
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes); // includes /profiles and /u/:handle

app.use(notFound);
app.use(errorHandler);

export default app;
