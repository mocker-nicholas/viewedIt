import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username is already taken"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  email: {
    type: String,
    required: [true, "Email address is required"],
  },
});

const User = new mongoose.model("User", UserSchema);

export default User;
