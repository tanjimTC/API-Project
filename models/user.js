const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fistName: String,
  lastName: String,
  email: String,
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car",
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
