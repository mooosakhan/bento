import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    version: { type: Number, default: 2 },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    handle: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true
    },

    profile: {
      displayName: { type: String, default: "" },
      headline: { type: String, default: "" },
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      avatar: {
        type: {
          type: String,
          enum: ["url", "upload", "preset"],
          default: "url"
        },
        value: { type: String, default: "" }
      }
    },

    theme: {
      mode: { type: String, enum: ["light", "dark", "system"], default: "system" },
      accentColor: { type: String, default: "#111827" },
      cardStyle: { type: String, default: "solid" },
      surface: { type: Object, default: { light: "#ffffff", dark: "#0b1220" } },
      background: { type: Object, default: { light: "#f7f7f7", dark: "#050913" } },
      fontScale: { type: Number, default: 1 }
    },

    layout: {
      page: {
        maxWidth: { type: Number, default: 1040 },
        sectionGap: { type: Number, default: 18 },
        contentPaddingX: { type: Number, default: 20 },
        contentPaddingY: { type: Number, default: 28 }
      },
      navbar: { type: Object, default: {} },
      hero: { type: Object, default: {} }
    },

    blocks: {
      type: Array,
      default: []
    },

    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
