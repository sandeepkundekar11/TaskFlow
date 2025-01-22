import { Schema, model } from "mongoose";

const SprintSchema = new Schema({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  project: { type: Schema.Types.ObjectId, ref: "project" },
  Tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isStarted: {
    type: Boolean,
    default: false,
  },
});

const SprintModel = model("sprint", SprintSchema);
export default SprintModel;
