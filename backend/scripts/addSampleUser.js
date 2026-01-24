#!/usr/bin/env node
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import User from '../src/models/User.model.js';
import Profile from '../src/models/Profile.model.js';

const [,, email, password, handleArg] = process.argv;

if (!email || !password || !handleArg) {
  console.error('Usage: node scripts/addSampleUser.js <email> <password> <handle>');
  process.exit(1);
}

const handle = handleArg.toLowerCase();

function prettyName(h) {
  return h.replace(/[-_.]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not set in environment');

    await connectDB(uri);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists (id=${existingUser._id}).`);
    } else {
      const name = prettyName(handleArg);
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash });
      console.log('Created user', user._id.toString());

      const existingProfile = await Profile.findOne({ handle });
      if (existingProfile) {
        console.log(`Profile with handle ${handle} already exists (id=${existingProfile._id}).`);
      } else {
        const profile = await Profile.create({ owner: user._id, handle, profile: { displayName: name } });
        console.log('Created profile', profile._id.toString());
      }
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    try {
      const mongoose = await import('mongoose');
      await mongoose.disconnect();
    } catch (e) {}
    process.exit();
  }
}

main();
