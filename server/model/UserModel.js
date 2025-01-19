import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  invitationStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "completed"],
  },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  projects: [{ type: Schema.Types.ObjectId, ref: "project" }],
  company: { type: Schema.Types.ObjectId, ref: "administrator" },
});

// Virtual field to count tasks created by the user
UserSchema.virtual("taskCount", {
  ref: "task", // Reference to the Task model
  localField: "_id", // Match `User._id` with `Task.author`
  foreignField: "author", // The field in Task that stores the user reference
  count: true, // Only return the count, not the actual tasks
});

// Enable virtuals in JSON output
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

const UserModel = model("user", UserSchema);

export default UserModel;
