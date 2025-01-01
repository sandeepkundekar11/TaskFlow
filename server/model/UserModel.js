import { Schema, Model } from "mongoose";
const UserSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  projects: [{ type: Schema.Types.ObjectId, ref: "project" }],
  company: { type: Schema.Types.ObjectId, ref: "administrator" },
});

const UserModel = Model("user", UserSchema);

export default UserModel;
