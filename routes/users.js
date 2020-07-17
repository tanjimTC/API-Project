const express = require("express");
const router = require("express-promise-router")();
const userController = require("../controllers/users");

//  by "/" we are actually in /user route because app.js we used route as "app.use("/users", users);"
router.route("/").get(userController.index).post(userController.newUser);

//  by "/:userID" we are actually in "/user/:userID" route because app.js we used route as "app.use("/users", users);"
router
  .route("/:userID")
  .get(userController.getUser)
  .put(userController.replaceUser)
  .patch(userController.updateUser);

module.exports = router;
