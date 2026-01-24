import dbConnect from "../config/db.js";
import Profile from "../models/Profile.model.js";
import { slugifyHandle } from "../utils/slugify.js";

async function ensureHandleUnique(handle, ownerId) {
  const exists = await Profile.findOne({ handle, owner: { $ne: ownerId } })
    .select("_id")
    .lean();
  return !exists;
}

export async function createProfile(req, res) {
  await dbConnect();
  // Optional route if you want multiple profiles later
  const ownerId = req.user.id;
  const body = req.body || {};

  const requestedHandle = slugifyHandle(body?.handle || "");
  if (!requestedHandle)
    return res.status(400).json({ message: "handle is required" });

  const ok = await ensureHandleUnique(requestedHandle, ownerId);
  if (!ok) return res.status(409).json({ message: "Handle already taken" });

  const doc = await Profile.create({
    ...body,
    owner: ownerId,
    handle: requestedHandle,
  });

  return res.status(201).json(doc);
}

export async function getMyProfile(req, res) {
  await dbConnect();
  const ownerId = req.user.id;
  const doc = await Profile.findOne({ owner: ownerId }).lean();
  if (!doc) return res.status(404).json({ message: "Profile not found" });
  return res.json(doc);
}

export async function updateMyProfile(req, res) {
  await dbConnect();
  const ownerId = req.user.id;
  const body = req.body || {};

  // Protect fields
  delete body.owner;
  delete body.createdAt;
  delete body.updatedAt;

  // If they attempt to change handle, validate uniqueness
  if (typeof body.handle === "string" && body.handle.trim()) {
    const normalized = slugifyHandle(body.handle);
    const ok = await ensureHandleUnique(normalized, ownerId);
    if (!ok) return res.status(409).json({ message: "Handle already taken" });
    body.handle = normalized;
  } else {
    // don't allow blank handle overwrites
    delete body.handle;
  }

  const updated = await Profile.findOneAndUpdate(
    { owner: ownerId },
    { $set: body },
    { new: true, upsert: false },
  ).lean();

  if (!updated) return res.status(404).json({ message: "Profile not found" });
  return res.json(updated);
}

export async function deleteMyProfile(req, res) {
  const ownerId = req.user.id;
  const deleted = await Profile.findOneAndDelete({ owner: ownerId }).lean();
  if (!deleted) return res.status(404).json({ message: "Profile not found" });
  return res.json({ ok: true });
}

export async function getPublicProfile(req, res) {
  const handle = String(req.params.handle || "")
    .toLowerCase()
    .trim();
  const doc = await Profile.findOne({ handle, published: true })
    .select("-owner -__v") // hide internal owner id
    .lean();

  if (!doc) return res.status(404).json({ message: "Profile not found" });
  return res.json(doc);
}
