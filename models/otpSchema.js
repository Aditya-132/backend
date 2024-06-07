import mongoose from "mongoose";
import validator from "validator";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Please provide a valid email!"],
    
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
});

export const Otp = mongoose.model("Otpp", otpSchema);
