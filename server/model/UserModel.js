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

const UserModel = model("user", UserSchema);

export default UserModel;
