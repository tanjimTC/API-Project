const router = require("express-promise-router")();
const carController = require("../controllers/cars");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(carController.index)
  .post(validateBody(schemas.carSchema), carController.newCar);

router
  .route("/:carId")
  .get(validateParam(schemas.idSchema, "carId"), carController.getCar)
  .put(
    [
      validateParam(schemas.idSchema, "carId"),
      validateBody(schemas.putCarSchema),
    ],
    carController.replaceCar
  )
  .patch(
    [
      validateParam(schemas.idSchema, "carId"),
      validateBody(schemas.patchCarSchema),
    ],
    carController.updateCar
  )
  .delete(validateParam(schemas.idSchema, "carId"), carController.deleteCar);

module.exports = router;
