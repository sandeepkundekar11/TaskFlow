import { Schema, model } from "mongoose";

const SprintSchema = Schema({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  project: { type: Schema.Types.ObjectId, ref: "project" },
  Tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
});

const SprintModel = model("sprint", SprintSchema);
export default SprintModel;
