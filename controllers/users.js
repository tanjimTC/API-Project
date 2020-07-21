const User = require("../models/user");
const Car = require("../models/car");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    //Enforce and make sure req.body contains all the fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ status: true });
  },

  updateUser: async (req, res, next) => {
    //req.body may contains any number of fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ status: true });
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params;
    // create new car form req.body
    const newCar = new Car(req.value.body);
    // Get the user
    const user = await User.findById(userId);
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
