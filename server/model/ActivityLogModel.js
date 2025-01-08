import { Model, Schema, Types } from "mongoose";

const ActivitySchema = Schema({
  name: {
    type: Types.ObjectId,
    ref: "user",
  },
  action: {
    type: String,
    enum: ["Create", "Update"],
  },
  task: {
    type: String,
  },
  TaskId: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const ActivityModel = Model("activity", ActivitySchema);
export default ActivityModel;
