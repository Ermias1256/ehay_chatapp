import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: "",
  },
  allowedRoles: {
    //1001 - Admin, 1000 - User,
    type: [String],
    default: ["1000"],
  },
  userContacts: {
    //freinds of this user can chat with
    type: [String],
    default: [],
  },
  memberOf: {
    //groups this user can chat with
    type: [String],
    default: [],
  },
  creator: String, // the creator of the message
  createdAt: {
    // date of creation
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
