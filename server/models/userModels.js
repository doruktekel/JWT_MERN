import mongoose, { Schema } from "mongoose";

const user = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

const userModel = mongoose.model("user", user);
export default userModel;
