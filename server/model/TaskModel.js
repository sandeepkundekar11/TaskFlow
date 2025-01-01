import { Schema, model } from "mongoose";

const TaskSchema = Schema({
  title: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  subTasks: [{ type: Schema.Types.ObjectId, ref: "subtask" }],
  IsInSprint: { type: Boolean, default: false },
});

const TaskModel = model("task", TaskSchema);

export default TaskModel;
