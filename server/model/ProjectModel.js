import { Schema, model } from "mongoose";

const ProjectSchema = Schema({
  name: { type: String },
  description: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  company: { type: Schema.Types.ObjectId, ref: "administrator" },
});

const ProjectModel = model("project", ProjectSchema);
export default ProjectModel;
