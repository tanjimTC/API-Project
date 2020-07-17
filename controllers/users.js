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

  getUser: async (req, res, next) => {
    const { userID } = req.params;
    const user = await User.findById(userID);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    //Enforce and make sure req.body contains all the fields
    const { userID } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userID, newUser);
    res.status(200).json({ status: true });
  },

  updateUser: async (req, res, next) => {
    //req.body may contains any number of fields
    const { userID } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userID, newUser);
    res.status(200).json({ status: true });
  },
};

// we can interact with Mongoose in 3 different ways
//   1 = callback function
//   2 = Pormises
//   3 = async/await
