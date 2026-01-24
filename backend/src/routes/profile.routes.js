import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getPublicProfile
} from "../controllers/profile.controller.js";

const router = Router();

// Public
router.get("/u/:handle", getPublicProfile);

// Private (owner)
router.post("/profiles", auth, createProfile);     // optional
router.get("/profiles/me", auth, getMyProfile);
router.put("/profiles/me", auth, updateMyProfile);
router.delete("/profiles/me", auth, deleteMyProfile);

export default router;
