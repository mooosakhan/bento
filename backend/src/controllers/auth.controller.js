import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import Profile from "../models/Profile.model.js";
import { slugifyHandle } from "../utils/slugify.js";
import dbConnect from "../config/db.js";

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

async function ensureUniqueHandle(base) {
  let handle = base || "user";
  let suffix = 0;

  // try base, then base-2, base-3...
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const exists = await Profile.exists({ handle });
    if (!exists) return handle;
    suffix += 1;
    handle = `${base}-${suffix + 1}`;
  }
}

function defaultProfileDoc({ ownerId, handle, name, email }) {
  return {
    version: 2,
    owner: ownerId,
    handle,
    profile: {
      displayName: name,
      headline: "Portfolio",
      bio: "",
      location: "",
      avatar: {
        type: "url",
        value: `https://api.dicebear.com/7.x/notionists/svg?seed=${handle}`,
      },
    },
    theme: {
      mode: "system",
      accentColor: "#111827",
      cardStyle: "solid",
      surface: { light: "#ffffff", dark: "#0b1220" },
      background: { light: "#f7f7f7", dark: "#050913" },
      fontScale: 1,
    },
    layout: {
      page: {
        maxWidth: 1040,
        sectionGap: 18,
        contentPaddingX: 20,
        contentPaddingY: 28,
      },
      navbar: {
        variant: "minimal",
        brandText: name.split(" ")[0] || "Me",
        links: [
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ],
        showCTA: true,
        ctaText: "Contact",
        ctaHref: "#contact",
        sticky: true,
      },
      hero: {
        variant: "classic",
        primaryCTA: { label: "View Projects", href: "#projects" },
        secondaryCTA: { label: "Contact", href: "#contact" },
        highlights: [
          { label: "Email", value: email },
          { label: "Open to", value: "Opportunities" },
        ],
      },
    },
    blocks: [
      {
        id: "about",
        type: "sectionHeader",
        props: { title: "About", subtitle: "A quick intro" },
      },
      {
        id: "about-card",
        type: "card",
        props: {
          title: "What I do",
          description:
            "Write a short intro about your work, impact, and what you’re building.",
          ctaLabel: "Email me",
          ctaHref: "#contact",
        },
      },
      {
        id: "projects",
        type: "sectionHeader",
        props: { title: "Projects", subtitle: "Things I've built" },
      },
      {
        id: "projects-list",
        type: "projects",
        props: {
          projects: [
            {
              title: "My Project",
              description: "A short description of your project.",
              techStack: ["Next.js", "TypeScript", "Tailwind"],
              link: "https://example.com",
            },
          ],
        },
      },
      {
        id: "contact",
        type: "socialRow",
        props: { github: "", linkedin: "", twitter: "" },
      },
    ],
    published: true,
  };
}

export async function register(req, res) {
  await dbConnect();
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email, password are required" });
  }

  const existing = await User.findOne({
    email: String(email).toLowerCase().trim(),
  });
  if (existing)
    return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    passwordHash,
  });

  console.log(user, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<user");

  const baseHandle =
    slugifyHandle(name) || slugifyHandle(email.split("@")[0]) || "user";
  const handle = await ensureUniqueHandle(baseHandle);


  console.log("handle", handle);
  

  await Profile.create(
    defaultProfileDoc({
      ownerId: user._id,
      handle,
      name: user.name,
      email: user.email,
    }),
  );

  const token = signToken(user);
  return res.status(201).json({
    success: true,
    message: "Registration successful",
    token,
    user: { id: user._id, name: user.name, email: user.email, role: "user" },
    handle,
  });
}

export async function login(req, res) {
  await dbConnect();
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({
    email: String(email).toLowerCase().trim(),
  });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  const profile = await Profile.findOne({ owner: user._id })
    .select("handle")
    .lean();

  return res.json({
    message: "Login successful",
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    handle: profile?.handle || null,
  });
}

export async function me(req, res) {
  await dbConnect();
  // req.user set by auth middleware
  const user = await User.findById(req.user.id)
    .select("_id name email role createdAt")
    .lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user });
}
