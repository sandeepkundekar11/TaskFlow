import { model, Schema, Types } from "mongoose";

const ActivitySchema =new Schema({
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

const ActivityModel = model("activity", ActivitySchema);
export default ActivityModel;
