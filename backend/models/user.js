import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    phone: String,
    Task:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
      }
    ]
  },
  { timestamps: true }
);

export const User = model("user", UserSchema);
