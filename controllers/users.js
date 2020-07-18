const User = require("../models/user");
const Car = require("../models/car");
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

  getUserCars: async (req, res, next) => {
    const { userID } = req.params;
    const user = await User.findById(userID).populate("cars");
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userID } = req.params;
    // create new car form req.body
    const newCar = new Car(req.body);
    // Get the user
    const user = await User.findById(userID);
    // Assign that user to the car's seller
    newCar.seller = user;
    // Save the car to database with the change (with seller info/user)
    await newCar.save();
    // now we have to do the same thing for the user model
    // Add car to the user's selling Array name = 'cars'
    // Basically here we want to get the newCar created and push it to the user model's car array
    user.cars.push(newCar);
    // Save the user
    await user.save();
    res.status(201).json(newCar);
  },
};

// we can interact with Mongoose in 3 different ways
//   1 = callback function
//   2 = Pormises
//   3 = async/await
