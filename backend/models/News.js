import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Politics", "Sports", "Technology", "Business", "Entertainment", "Health", "World", "Other"],
      default: "Other",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

newsSchema.index({ title: "text", summary: "text", content: "text" });

export default mongoose.model("News", newsSchema);
