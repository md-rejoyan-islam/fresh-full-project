import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    cell:{
        type:String, required:[true,"cell is required"] , trim:true
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      min: 0,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["female", "male"],
      required: [true, "gender is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    photo: { type: String, required: [true, "photo is required"] },
    trash: {
      type: Boolean, default:false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", StudentSchema);
