import { Schema, model } from "mongoose";

const SubTaskSchema = Schema({
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
});

const SubTaskModel = model("subtask", SubTaskSchema);
export default SubTaskModel;
