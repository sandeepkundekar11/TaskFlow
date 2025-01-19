import { Schema, model } from "mongoose";

const AdministratorSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  company: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    default:"admin"
  }
});

const AdministratorModel = model("administrator", AdministratorSchema);
export default AdministratorModel;
