import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { getAllUsers, getUserStats } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", auth, isAdmin, getAllUsers);
router.get("/stats", auth, isAdmin, getUserStats);

export default router;
