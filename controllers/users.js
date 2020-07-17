const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },
};

// we can interact with Mongoose in 3 different ways
//   1 = callback function
//   2 = Pormises
//   3 = async/await
