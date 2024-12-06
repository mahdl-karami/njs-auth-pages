import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export const userModel = models.userModel || model("userModel", userSchema);
