import { Schema, model } from "mongoose";

const SubTaskSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    default: "todo",
    enum: ["todo", "inProgress", "completed"],
  },
  taskCode: {
    type: String,
  },
});

const SubTaskModel = model("subtask", SubTaskSchema);
export default SubTaskModel;
