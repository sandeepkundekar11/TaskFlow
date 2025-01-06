import { Model, Schema, Types } from "mongoose";

const ActivitySchema = Schema({
  name: {
    type: Types.ObjectId,
    ref: "user",
  },
  logtype: {
    type: String,
    enum: ["Create", "Update"],
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  discription: {
    type: String,
  },
  TaskId: {
    type: String,
  },
});

const ActivityModel = Model("activity", ActivitySchema);
export default ActivityModel;
