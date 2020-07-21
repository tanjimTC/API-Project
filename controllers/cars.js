const Car = require("../models/car");
const User = require("../models/user");
module.exports = {
  index: async (req, res, next) => {
    //   Get all cars
    const cars = await Car.find({});
    console.log("cars", cars);
    res.status(200).json(cars);
  },
  newCar: async (req, res, next) => {
    // 1.find the actual seller
    const seller = await User.findById(req.value.body.seller);
    // 2.Create a new car
    const newCar = req.value.body;
    delete newCar.seller;

    const car = new Car(newCar);
    car.seller = seller;
    await car.save();
    // 3.Add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    res.status(200).json(car);
  },
  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    console.log("car haha", car);
    res.status(200).json(car);
  },
  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },
  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },
  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    // Get a car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({ error: "This car doesn't exist" });
    }
    const sellerId = car.seller;
    // Get the seller
    const seller = await User.findById(sellerId);

    // Remove the car
    await car.remove();
    // Remove the car from seller's selling list
    seller.cars.pull(car);
    await seller.save();

    res.status(200).json({ success: true });
  },
};
