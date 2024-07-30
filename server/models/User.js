const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  privacy: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
