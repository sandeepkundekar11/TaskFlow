import { model, Schema, Types } from "mongoose";

const ActivitySchema = new Schema({
  name: {
    type: Types.ObjectId,
    ref: "user",
  },
  action: {
    type: String,
    enum: ["Created", "Updated", "Deleted"],
  },
  task: {
    type: String,
  },
  TaskId: {
    type: String, //"EM-12"
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.index({ name: 1 });

const ActivityModel = model("activity", ActivitySchema);
export default ActivityModel;
