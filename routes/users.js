const express = require("express");
const router = require("express-promise-router")();
const userController = require("../controllers/users");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");
//  by "/" we are actually in /user route because app.js we used route as "app.use("/users", users);"
router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.userSchema), userController.newUser);

//  by "/:userID" we are actually in "/user/:userID" route because app.js we used route as "app.use("/users", users);"
router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema),
    ],
    userController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userOptionalSchema),
    ],
    userController.updateUser
  );

router
  .route("/:userID/cars")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUserCars)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.carSchema),
    ],
    userController.newUserCar
  );

module.exports = router;
