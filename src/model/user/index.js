const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: "string",
    email: "string",
    password: "string",
    createDate: "date",
    updatedDate: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
