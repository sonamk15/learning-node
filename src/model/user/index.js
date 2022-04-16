const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createDate: "date",
    updatedDate: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
