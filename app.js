const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/apiproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

//Routes
const users = require("./routes/users");
const cars = require("./routes/cars");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", users);
app.use("/cars", cars);

// Catch 404 Errors and send them to Error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Response to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
  // Response to ourself
  console.error(err);
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
