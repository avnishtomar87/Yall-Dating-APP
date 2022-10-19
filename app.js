const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, API_PREFIX } = require("./helpers/constant")
const port = PORT || 3001;
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
var favicon = require("serve-favicon");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./helpers/errorHandler");

// example of uncaughtException is --> console.log(x)
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SERVER SHUTTING DOWN......");
  console.log(err.name, err.stack);
  process.exit(1);
});

//middlewares
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes
const routes = require("./routes/routes");
app.set("base", API_PREFIX);
app.use(`/${API_PREFIX}`, routes);

//handled no route url error
app.all("*", (req, res, next) => {
  next(new AppError(`cant found the ${req.originalUrl} on this server`));
});
// Global Error Handler
app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// example of unhand/jection i.e. some error in db connection may be wrong credentials
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION ! SERVER SHUTTING DOWN......");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
