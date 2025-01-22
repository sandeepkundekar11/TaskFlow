import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  subTasks: [{ type: Schema.Types.ObjectId, ref: "subtask" }],
  IsInSprint: { type: Boolean, default: false },
  taskCode: {
    type: String
  }
});

const TaskModel = model("task", TaskSchema);

export default TaskModel;
