import mongoose from "mongoose";

const appParamSchema = mongoose.Schema({
  code: { type: String, required: true },
  value: { type: String, required: true },
  creator: String, // the creator of the message
  createdAt: {
    // date of creation
    type: Date,
    default: new Date(),
  },
});

const AppParam = mongoose.model("AppParam", appParamSchema);

export default AppParam;
