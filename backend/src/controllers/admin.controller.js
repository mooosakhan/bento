import User from "../models/User.model.js";
import Profile from "../models/Profile.model.js";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    const usersWithProfiles = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ userId: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          hasProfile: !!profile,
          handle: profile?.handle || null,
        };
      })
    );

    res.json({
      count: usersWithProfiles.length,
      users: usersWithProfiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function getUserStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalProfiles = await Profile.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });

    res.json({
      totalUsers,
      totalProfiles,
      adminCount,
      usersWithoutProfile: totalUsers - totalProfiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}
